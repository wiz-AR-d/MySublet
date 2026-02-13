// Bookings API calls
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { transformBooking } from '../../utils/dataTransformers';

export const bookingsAPI = {
  /**
   * Get all bookings for current user (as tenant or landlord)
   */
  getAll: async (userId = null) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      // Get current user if not provided
      if (!userId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');
        userId = user.id;
      }

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          listings!bookings_listing_id_fkey (
            *,
            profiles!listings_user_id_fkey (
              id,
              full_name,
              avatar_url,
              email
            )
          ),
          profiles!bookings_tenant_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .or(`tenant_id.eq.${userId},listings.user_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedBookings = (data || []).map(booking => 
        transformBooking(booking, booking.listings, booking.profiles)
      );

      return { data: transformedBookings, error: null };
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return { data: null, error };
    }
  },

  /**
   * Get bookings for a specific listing
   */
  getByListingId: async (listingId) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles!bookings_tenant_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .eq('listing_id', listingId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedBookings = (data || []).map(booking => 
        transformBooking(booking, null, booking.profiles)
      );

      return { data: transformedBookings, error: null };
    } catch (error) {
      console.error('Error fetching bookings for listing:', error);
      return { data: null, error };
    }
  },

  /**
   * Get a single booking by ID
   */
  getById: async (id) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          listings!bookings_listing_id_fkey (
            *,
            profiles!listings_user_id_fkey (
              id,
              full_name,
              avatar_url,
              email
            )
          ),
          profiles!bookings_tenant_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      const transformedBooking = transformBooking(data, data.listings, data.profiles);

      return { data: transformedBooking, error: null };
    } catch (error) {
      console.error('Error fetching booking:', error);
      return { data: null, error };
    }
  },

  /**
   * Create a new booking
   */
  create: async (booking) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Calculate total price based on listing price and duration
      const { data: listing } = await supabase
        .from('listings')
        .select('price_per_month, available_from, available_to')
        .eq('id', booking.listing_id)
        .single();

      if (!listing) throw new Error('Listing not found');

      const startDate = new Date(booking.start_date);
      const endDate = new Date(booking.end_date);
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const months = days / 30;
      const totalPrice = parseFloat(listing.price_per_month) * months;

      const bookingData = {
        listing_id: booking.listing_id,
        tenant_id: user.id,
        start_date: booking.start_date,
        end_date: booking.end_date,
        total_price: totalPrice,
        status: 'pending',
        special_requests: booking.special_requests || null
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select(`
          *,
          listings!bookings_listing_id_fkey (
            *,
            profiles!listings_user_id_fkey (
              id,
              full_name,
              avatar_url,
              email
            )
          ),
          profiles!bookings_tenant_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .single();

      if (error) throw error;

      const transformedBooking = transformBooking(data, data.listings, data.profiles);

      return { data: transformedBooking, error: null };
    } catch (error) {
      console.error('Error creating booking:', error);
      return { data: null, error };
    }
  },

  /**
   * Update a booking
   */
  update: async (id, updates) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          listings!bookings_listing_id_fkey (
            *,
            profiles!listings_user_id_fkey (
              id,
              full_name,
              avatar_url,
              email
            )
          ),
          profiles!bookings_tenant_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .single();

      if (error) throw error;

      const transformedBooking = transformBooking(data, data.listings, data.profiles);

      return { data: transformedBooking, error: null };
    } catch (error) {
      console.error('Error updating booking:', error);
      return { data: null, error };
    }
  },

  /**
   * Cancel a booking
   */
  cancel: async (id) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .select(`
          *,
          listings!bookings_listing_id_fkey (
            *,
            profiles!listings_user_id_fkey (
              id,
              full_name,
              avatar_url,
              email
            )
          ),
          profiles!bookings_tenant_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .single();

      if (error) throw error;

      const transformedBooking = transformBooking(data, data.listings, data.profiles);

      return { data: transformedBooking, error: null };
    } catch (error) {
      console.error('Error cancelling booking:', error);
      return { data: null, error };
    }
  }
};

