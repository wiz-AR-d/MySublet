// src/services/api/savedListings.js
import { supabase } from '../../lib/supabase'

export const savedListingsAPI = {
  /**
   * Get all saved listings for a user
   */
  getUserSavedListings: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('saved_listings')
        .select(`
          id,
          created_at,
          listing_id,
          listings (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Extract the listing data from the join
      const listings = data?.map(item => item.listings) || []
      return { data: listings, error: null }
    } catch (error) {
      console.error('Error fetching saved listings:', error)
      return { data: null, error }
    }
  },

  /**
   * Save/bookmark a listing
   */
  saveListing: async (userId, listingId) => {
    try {
      const { data, error } = await supabase
        .from('saved_listings')
        .insert({
          user_id: userId,
          listing_id: listingId
        })
        .select()
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error saving listing:', error)
      return { data: null, error }
    }
  },

  /**
   * Remove a saved listing
   */
  removeSavedListing: async (userId, listingId) => {
    try {
      const { error } = await supabase
        .from('saved_listings')
        .delete()
        .eq('user_id', userId)
        .eq('listing_id', listingId)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Error removing saved listing:', error)
      return { error }
    }
  },

  /**
   * Check if a listing is saved by the user
   */
  isListingSaved: async (userId, listingId) => {
    try {
      const { data, error } = await supabase
        .from('saved_listings')
        .select('id')
        .eq('user_id', userId)
        .eq('listing_id', listingId)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      return { isSaved: !!data, error: null }
    } catch (error) {
      console.error('Error checking saved status:', error)
      return { isSaved: false, error }
    }
  },

  /**
   * Get count of saved listings for a user
   */
  getSavedCount: async (userId) => {
    try {
      const { count, error } = await supabase
        .from('saved_listings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

      if (error) throw error
      return { count: count || 0, error: null }
    } catch (error) {
      console.error('Error getting saved count:', error)
      return { count: 0, error }
    }
  }
}
