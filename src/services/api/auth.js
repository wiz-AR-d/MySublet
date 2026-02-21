// Auth API calls
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export const authAPI = {
  /**
   * Sign in with email and password
   */
  signIn: async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      return { data: null, error: { message: 'Supabase is not configured' } };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Fetch profile
      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        return { 
          data: { 
            user: data.user, 
            session: data.session,
            profile: profile 
          }, 
          error: null 
        };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { data: null, error };
    }
  },

  /**
   * Sign up with email and password
   */
  signUp: async (email, password, userData = {}) => {
    if (!isSupabaseConfigured || !supabase) {
      return { data: null, error: { message: 'Supabase is not configured' } };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name || '',
            university: userData.university || '',
            phone: userData.phone || '',
          }
        }
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error signing up:', error);
      return { data: null, error };
    }
  },

  /**
   * Sign out
   */
  signOut: async () => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: { message: 'Supabase is not configured' } };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error signing out:', error);
      return { error };
    }
  },

  /**
   * Get current user
   */
  getCurrentUser: async () => {
    if (!isSupabaseConfigured || !supabase) {
      return { data: null, error: { message: 'Supabase is not configured' } };
    }

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      if (!user) return { data: null, error: null };

      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      return { 
        data: { user, profile }, 
        error: null 
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return { data: null, error };
    }
  },

  /**
   * Sign in with Google
   */
  signInWithGoogle: async () => {
    if (!isSupabaseConfigured || !supabase) {
      return { data: null, error: { message: 'Supabase is not configured' } };
    }

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error signing in with Google:', error);
      return { data: null, error };
    }
  },

  /**
   * Reset password
   */
  resetPassword: async (email) => {
    if (!isSupabaseConfigured || !supabase) {
      return { data: null, error: { message: 'Supabase is not configured' } };
    }

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error resetting password:', error);
      return { data: null, error };
    }
  }
};

