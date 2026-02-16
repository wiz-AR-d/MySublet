// Listings API calls
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { transformListing, transformListingToSupabase } from '../../utils/dataTransformers';

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
        .eq('status', filters.status || 'active')
        .order('created_at', { ascending: false });

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
      console.log('Listing data received:', listing);
      
      const supabaseListing = transformListingToSupabase(listing, userId);
      console.log('Transformed Supabase listing:', supabaseListing);

      // Validate required fields
      if (!supabaseListing.title || !supabaseListing.address || !supabaseListing.city || !supabaseListing.state) {
        throw new Error('Missing required fields: title, address, city, and state are required');
      }

      const { data, error } = await supabase
        .from('listings')
        .insert(supabaseListing)
        .select(`
          *,
          profiles!listings_user_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .single();

      console.log('Supabase insert response:', { data, error });

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      if (!data) {
        throw new Error('No data returned from database');
      }

      const transformedListing = transformListing(data, data.profiles);
      console.log('Final transformed listing:', transformedListing);

      return { data: transformedListing, error: null };
    } catch (error) {
      console.error('Error creating listing:', error);
      // Return more detailed error information
      return { 
        data: null, 
        error: {
          message: error.message || 'Unknown error occurred',
          code: error.code,
          details: error.details,
          hint: error.hint
        }
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

      if (!existing) {
        throw new Error('Listing not found');
      }

      // Transform updates if needed
      const supabaseUpdates = transformListingToSupabase(
        { ...existing, ...updates },
        userId
      );

      // Remove user_id from updates (shouldn't change)
      delete supabaseUpdates.user_id;

      const { data, error } = await supabase
        .from('listings')
        .update(supabaseUpdates)
        .eq('id', id)
        .select(`
          *,
          profiles!listings_user_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .single();

      if (error) throw error;

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

