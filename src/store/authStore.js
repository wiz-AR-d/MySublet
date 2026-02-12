import { create } from 'zustand'
//updated on 11/20/2025 1:45 pm
// import { supabase } from '../lib/supabase'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
//
const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  session: null,
  loading: true,

  // Initialize auth
  initialize: async () => {
    //updated on 11/20/2025 1:45 pm
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase is not configured. Skipping auth initialization.')
      set({ loading: false })
      return
    }
    //
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        // Fetch user profile with role
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        set({
          user: session.user,
          profile: profile,
          session: session,
          loading: false,
        })
      } else {
        set({
          user: null,
          profile: null,
          session: null,
          loading: false,
        })
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          // Fetch updated profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          set({
            user: session.user,
            profile: profile,
            session: session,
          })
        } else {
          set({
            user: null,
            profile: null,
            session: null,
          })
        }
      })
    } catch (error) {
      console.error('Auth init error:', error)
      set({ loading: false })
    }
  },

  // Email/Password Sign Up
  signUp: async (email, password, metadata) => {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase is not configured. Skipping sign up.')
      return { data: null, error: { message: 'Supabase is not configured.' } }
    }
    set({ loading: true })
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    set({ loading: false })
    return { data, error }
  },

  // Email/Password Sign In
  signIn: async (email, password) => {
    //updated on 11/20/2025 1:45 pm
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase is not configured. Skipping sign in.')
      return { data: null, error: { message: 'Supabase is not configured.' } }
    }
    //
    set({ loading: true })
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (!error && data.user) {
      // Fetch profile after sign in
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()
      
      set({ 
        profile: profile,
        loading: false 
      })
    } else {
      set({ loading: false })
    }
    
    return { data, error }
  },

  // Google Sign In
  signInWithGoogle: async () => {
    //updated on 11/20/2025 1:45 pm
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase is not configured. Skipping Google sign in.')
      return { data: null, error: { message: 'Supabase is not configured.' } }
    }
    //
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { data, error }
  },

  // Update user profile (including role if needed)
  updateProfile: async (updates) => {
    //updated on 11/20/2025 1:45 pm
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase is not configured. Skipping profile update.')
      return { data: null, error: { message: 'Supabase is not configured.' } }
    }
    //
    const { user } = get()
    if (!user) return { error: { message: 'No user logged in' } }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (!error) {
      set({ profile: data })
    }

    return { data, error }
  },

  // Check if user has a specific role
  hasRole: (role) => {
    const { profile } = get()
    return profile?.user_role === role
  },

  // Check if user is sublessor
  isSublessor: () => {
    const { profile } = get()
    return profile?.user_role === 'sublessor'
  },

  // Check if user is sublessee
  isSublessee: () => {
    const { profile } = get()
    return profile?.user_role === 'sublessee'
  },

  // Sign Out
  signOut: async () => {
    //updated on 11/20/2025 1:45 pm
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase is not configured. Nothing to sign out from.')
      set({
        user: null,
        profile: null,
        session: null,
      })
      return
    }
    //
    await supabase.auth.signOut()
    set({
      user: null,
      profile: null,
      session: null,
    })
  },
}))

export default useAuthStore