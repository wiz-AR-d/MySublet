// Listings API calls
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { transformListing, transformListingToSupabase } from '../../utils/dataTransformers';

/**
 * Read the JWT access token DIRECTLY from localStorage.
 * This bypasses the GoTrueClient lock entirely — safe because the token
 * in localStorage is always the last-known-good session token.
 * If the token is missing/expired, Supabase returns a fast 401 rather
 * than hanging indefinitely waiting for a lock to release.
 */
const getStoredAuthToken = () => {
  try {
    // storageKey matches what's set in lib/supabase.js → storageKey: 'sb-auth-token'
    const raw = window.localStorage.getItem('sb-auth-token');
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed?.access_token ?? null;
    }
  } catch (_) {
    // Silently ignore — will fall back to anon key
  }
  return null;
};

/**
 * Helper to fetch geocoding from OpenStreetMap
 */
const geocodeAddress = async (street, houseNumber, city, postalCode) => {
  // Hard 5-second timeout — Nominatim must not block listing creation
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const addressString = `${street || ''} ${houseNumber || ''}, ${postalCode || ''} ${city || ''}, Germany`.trim();

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressString)}`,
      {
        headers: { 'User-Agent': 'MySubletApp/1.0 (Student Project)' },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);
    if (!response.ok) return null;
    const data = await response.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.warn('Geocoding timed out after 5s — skipping coordinates');
    } else {
      console.error('Geocoding error:', error);
    }
    return null;
  }
};

// Supabase REST config (resolved at module load, no GoTrueClient involved)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const listingsAPI = {
  /**
   * Get all listings with optional filters
   */
  getAll: async (filters = {}) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      let query = supabase
        .from('listings')
        .select(`
          *,
          profiles!listings_user_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (filters.status !== 'all') {
        query = query.eq('status', filters.status || 'active');
      }

      // Apply filters
      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }

      if (filters.state) {
        query = query.ilike('state', `%${filters.state}%`);
      }

      if (filters.priceMin) {
        query = query.gte('price_per_month', filters.priceMin);
      }

      if (filters.priceMax) {
        query = query.lte('price_per_month', filters.priceMax);
      }

      if (filters.bedrooms !== undefined && filters.bedrooms !== null) {
        query = query.eq('bedrooms', filters.bedrooms);
      }

      if (filters.bathrooms) {
        query = query.eq('bathrooms', filters.bathrooms);
      }

      if (filters.availableFrom) {
        query = query.lte('available_from', filters.availableFrom);
      }

      if (filters.availableTo) {
        query = query.gte('available_to', filters.availableTo);
      }

      if (filters.userId) {
        query = query.eq('user_id', filters.userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform data
      const transformedListings = (data || []).map(listing => 
        transformListing(listing, listing.profiles)
      );

      return { data: transformedListings, error: null };
    } catch (error) {
      console.error('Error fetching listings:', error);
      return { data: null, error };
    }
  },

  /**
   * Get a single listing by ID
   */
  getById: async (id) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }
  
    try {
      // Try to increment views count (don't fail if function doesn't exist)
      try {
        await supabase.rpc('increment_listing_views', { listing_id: id });
      } catch (rpcError) {
        // Ignore RPC errors - view counting is not critical
        console.log('Could not increment views (function may not exist):', rpcError.message);
      }
  
      const { data, error } = await supabase
        .from('listings')
        .select(`
          *,
          profiles!listings_user_id_fkey (
            id,
            full_name,
            avatar_url,
            email,
            phone,
            university
          )
        `)
        .eq('id', id)
        .single();
  
      if (error) throw error;
  
      const transformedListing = transformListing(data, data.profiles);
  
      return { data: transformedListing, error: null };
    } catch (error) {
      console.error('Error fetching listing:', error);
      return { data: null, error };
    }
  },

  /**
   * Create a new listing
   */
  create: async (listing, userId) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    if (!userId) {
      throw new Error('User ID is required');
    }

    try {
      console.log('Creating listing for user:', userId);

      // Transform listing data
      const supabaseListing = transformListingToSupabase(listing, userId);

      // Validate required fields
      if (!supabaseListing.title) throw new Error('Title is required');
      if (!supabaseListing.city) throw new Error('City is required');
      if (!supabaseListing.street || !supabaseListing.house_number) {
        throw new Error('Street and house number are required');
      }

      // Strip coordinates — patched separately in background after insert
      const { coordinates: _coords, ...listingWithoutCoords } = supabaseListing;

      // ─── RAW FETCH INSERT ────────────────────────────────────────────────────
      // WHY: supabase-js calls getSession() before every DB request, which tries
      // to acquire the GoTrueClient auth lock. If a background token refresh is
      // hanging (its own fetch to the auth server not responding), this lock is
      // held indefinitely → the INSERT fetch never fires → 30 s timeout.
      //
      // FIX: read the JWT directly from localStorage (synchronous, no lock) and
      // use a plain fetch() for the INSERT. Supabase REST is unchanged; we're
      // just bypassing the supabase-js auth middleware.
      // ────────────────────────────────────────────────────────────────────────
      const authToken = getStoredAuthToken();
      console.log('Auth token available:', !!authToken);
      console.log('Inserting listing...');

      const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/listings`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${authToken ?? SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(listingWithoutCoords),
      });

      console.log('INSERT response status:', insertResponse.status);

      if (!insertResponse.ok) {
        const errorText = await insertResponse.text();
        console.error('INSERT failed:', insertResponse.status, errorText);
        throw new Error(`Failed to create listing (${insertResponse.status}): ${errorText}`);
      }

      // Fetch the created row back (separate GET — also uses the stored token)
      console.log('Fetching created listing...');
      const selectResponse = await fetch(
        `${SUPABASE_URL}/rest/v1/listings?user_id=eq.${userId}&order=created_at.desc&limit=1`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${authToken ?? SUPABASE_ANON_KEY}`,
            'Accept': 'application/json',
          },
        }
      );

      let data = null;
      if (selectResponse.ok) {
        const rows = await selectResponse.json();
        data = rows?.[0] ?? null;
      } else {
        console.warn('Could not fetch created listing — it was still saved');
      }

      // ── Fire-and-forget geocoding patch ──────────────────────────────────────
      // Geocode completely in background after listing is confirmed saved.
      if (data?.id) {
        geocodeAddress(
          listing.street, listing.houseNumber,
          listing.city, listing.postalCode || listing.zip_code
        )
          .then(coords => {
            if (!coords) return;
            return fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${data.id}`, {
              method: 'PATCH',
              headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${authToken ?? SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal',
              },
              body: JSON.stringify({ coordinates: coords }),
            });
          })
          .catch(err => console.warn('Background geocoding patch failed:', err.message));
      }

      if (!data) {
        // Listing was created but we can't read it back — return minimal success
        return { data: { id: null, status: listingWithoutCoords.status }, error: null };
      }

      const transformedListing = transformListing(data, null);
      console.log('Listing created successfully:', transformedListing?.id);
      return { data: transformedListing, error: null };

    } catch (error) {
      console.error('Error creating listing:', error);
      return {
        data: null,
        error: {
          message: error.message || 'Unknown error occurred',
          code: error.code,
          details: error.details,
          hint: error.hint,
        },
      };
    }
  },

  /**
   * Update an existing listing
   */
  update: async (id, updates, userId) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      // Get existing listing to merge updates
      const { data: existing } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single();

      if (!existing) throw new Error('Listing not found');

      const existingAppFormat = transformListing(existing, null);

      // Build update payload — strip user_id and coordinates
      const supabaseUpdates = transformListingToSupabase(
        { ...existingAppFormat, ...updates },
        userId
      );
      delete supabaseUpdates.user_id;
      delete supabaseUpdates.coordinates;

      const { data, error } = await supabase
        .from('listings')
        .update(supabaseUpdates)
        .eq('id', id)
        .select(`*, profiles!listings_user_id_fkey (id, full_name, avatar_url, email)`)
        .single();

      if (error) {
        console.error('Update error:', error);
        throw error;
      }

      // Re-geocode in background if address changed
      const addressChanged = updates.street || updates.houseNumber || updates.city
        || updates.postalCode || updates.zip_code;
      if (data?.id && addressChanged) {
        const fullAppFormat = { ...existingAppFormat, ...updates };
        geocodeAddress(
          fullAppFormat.street, fullAppFormat.houseNumber,
          fullAppFormat.city, fullAppFormat.postalCode || fullAppFormat.zip_code
        )
          .then(coords => {
            if (!coords) return;
            const tok = getStoredAuthToken();
            return fetch(`${SUPABASE_URL}/rest/v1/listings?id=eq.${data.id}`, {
              method: 'PATCH',
              headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${tok ?? SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal',
              },
              body: JSON.stringify({ coordinates: coords }),
            });
          })
          .catch(err => console.warn('Background geocoding on update failed:', err.message));
      }

      const transformedListing = transformListing(data, data.profiles);
      return { data: transformedListing, error: null };
    } catch (error) {
      console.error('Error updating listing:', error);
      return { data: null, error };
    }
  },

  /**
   * Delete a listing
   */
  delete: async (id) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { data: { id }, error: null };
    } catch (error) {
      console.error('Error deleting listing:', error);
      return { data: null, error };
    }
  },

  /**
   * Search listings by query
   */
  search: async (query, filters = {}) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      let dbQuery = supabase
        .from('listings')
        .select(`
          *,
          profiles!listings_user_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (query) {
        dbQuery = dbQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%,city.ilike.%${query}%,address.ilike.%${query}%`);
      }

      // Apply other filters
      if (filters.city) {
        dbQuery = dbQuery.ilike('city', `%${filters.city}%`);
      }

      if (filters.priceMin) {
        dbQuery = dbQuery.gte('price_per_month', filters.priceMin);
      }

      if (filters.priceMax) {
        dbQuery = dbQuery.lte('price_per_month', filters.priceMax);
      }

      const { data, error } = await dbQuery;

      if (error) throw error;

      const transformedListings = (data || []).map(listing => 
        transformListing(listing, listing.profiles)
      );

      return { data: transformedListings, error: null };
    } catch (error) {
      console.error('Error searching listings:', error);
      return { data: null, error };
    }
  }
};

