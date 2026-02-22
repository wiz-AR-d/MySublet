// src/services/api/verification.js
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { transformVerification } from '../../utils/dataTransformers';

export const verificationAPI = {
  /**
   * Submit a new verification request
   */
  submit: async (userId, verificationData) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { data, error } = await supabase
        .from('verifications')
        .insert({
          user_id: userId,
          method: verificationData.method,
          document_url: verificationData.documentUrl || null,
          email_used: verificationData.emailUsed || null,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Also update profile status to pending
      await supabase
        .from('profiles')
        .update({ verification_status: 'pending' })
        .eq('id', userId);

      return { data: transformVerification(data), error: null };
    } catch (error) {
      console.error('Error submitting verification:', error);
      return { data: null, error };
    }
  },

  /**
   * Get user's verification status
   */
  getStatus: async (userId) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { data, error } = await supabase
        .from('verifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows

      return { data: data ? transformVerification(data) : null, error: null };
    } catch (error) {
      console.error('Error getting verification status:', error);
      return { data: null, error };
    }
  },

  /**
   * Get all verification requests (admin only)
   */
  getAllPending: async () => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { data, error } = await supabase
        .from('verifications')
        .select(`
          *,
          profiles!verifications_user_id_fkey (
            id,
            full_name,
            email,
            avatar_url,
            university,
            company
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const transformedData = (data || []).map(v => ({
        ...transformVerification(v),
        user: v.profiles
      }));

      return { data: transformedData, error: null };
    } catch (error) {
      console.error('Error getting pending verifications:', error);
      return { data: null, error };
    }
  },

  /**
   * Approve a verification request (admin only)
   */
  approve: async (verificationId, reviewerId) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { data, error } = await supabase
        .from('verifications')
        .update({
          status: 'approved',
          reviewed_by: reviewerId,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', verificationId)
        .select()
        .single();

      if (error) throw error;

      return { data: transformVerification(data), error: null };
    } catch (error) {
      console.error('Error approving verification:', error);
      return { data: null, error };
    }
  },

  /**
   * Reject a verification request (admin only)
   */
  reject: async (verificationId, reviewerId, reason) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { data, error } = await supabase
        .from('verifications')
        .update({
          status: 'rejected',
          rejection_reason: reason,
          reviewed_by: reviewerId,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', verificationId)
        .select()
        .single();

      if (error) throw error;

      return { data: transformVerification(data), error: null };
    } catch (error) {
      console.error('Error rejecting verification:', error);
      return { data: null, error };
    }
  }
};