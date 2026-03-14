import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { transformProfile } from '../utils/dataTransformers'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      session: null,
      loading: true,
      initialized: false,

      // Initialize auth - called once on app mount
      // Helper: ensure a profile row exists for the given auth session user
      // This handles Google OAuth users who don't get a profile row from a trigger
      _ensureProfile: async (authUser) => {
        if (!authUser) return null
        const { data: existing } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle()

        if (existing) return existing

        // No profile row — create one from auth metadata
        console.log('[Auth] No profile found, creating one for:', authUser.email)
        const meta = authUser.user_metadata || {}
        const { data: created, error: createError } = await supabase
          .from('profiles')
          .upsert({
            id: authUser.id,
            email: authUser.email,
            full_name: meta.full_name || meta.name || '',
            avatar_url: meta.avatar_url || meta.picture || '',
            user_role: 'sublessee',
          }, { onConflict: 'id' })
          .select('*')
          .maybeSingle()

        if (createError) {
          console.error('[Auth] Error creating profile:', createError)
          return null
        }
        return created
      },

      // Initialize auth - called once on app mount
      initialize: async () => {
        if (!isSupabaseConfigured || !supabase) {
          console.warn('Supabase is not configured. Skipping auth initialization.')
          set({ loading: false, initialized: true })
          return
        }

        try {
          console.log('[Auth] Initializing authentication...')

          // Get session from Supabase (which reads from localStorage)
          const { data: { session }, error } = await supabase.auth.getSession()

          if (error) {
            console.error('[Auth] Error getting session:', error)
            set({
              user: null,
              profile: null,
              session: null,
              loading: false,
              initialized: true
            })
            return
          }

          if (session?.user) {
            console.log('[Auth] Session found, fetching/creating profile...')

            const profile = await get()._ensureProfile(session.user)

            set({
              user: session.user,
              profile: profile ? transformProfile(profile) : null,
              session: session,
              loading: false,
              initialized: true,
            })

            console.log('[Auth] Session restored successfully')
          } else {
            console.log('[Auth] No session found')
            set({
              user: null,
              profile: null,
              session: null,
              loading: false,
              initialized: true,
            })
          }

          // Listen for auth state changes
          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
              console.log('[Auth] State change:', event)

              if (session?.user) {
                const profile = await get()._ensureProfile(session.user)

                set({
                  user: session.user,
                  profile: profile ? transformProfile(profile) : null,
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
            }
          )

          // Store subscription for cleanup if needed
          return subscription
        } catch (error) {
          console.error('[Auth] Initialization error:', error)
          set({
            loading: false,
            initialized: true,
            user: null,
            profile: null,
            session: null
          })
        }
      },

      // Email/Password Sign Up
      signUp: async (email, password, metadata) => {
        if (!isSupabaseConfigured || !supabase) {
          console.warn('Supabase is not configured. Skipping sign up.')
          return { data: null, error: { message: 'Supabase is not configured.' } }
        }

        set({ loading: true })

        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: metadata,
            },
          })

          set({ loading: false })
          return { data, error }
        } catch (error) {
          set({ loading: false })
          return { data: null, error }
        }
      },

      // Email/Password Sign In
      signIn: async (email, password) => {
        if (!isSupabaseConfigured || !supabase) {
          console.warn('Supabase is not configured. Skipping sign in.')
          return { data: null, error: { message: 'Supabase is not configured.' } }
        }

        set({ loading: true })

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (error) {
            set({ loading: false })
            return { data, error }
          }

          if (data.user && data.session) {
            console.log('[Auth] Sign in successful')

            // Fetch profile after sign in
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .maybeSingle()

            if (profileError) {
              console.error('[Auth] Error fetching profile after sign in:', profileError)
            }

            // Update state - this will also persist to localStorage via middleware
            set({
              user: data.user,
              session: data.session,
              profile: profile ? transformProfile(profile) : null,
              loading: false,
              initialized: true
            })

            return { data, error: null }
          }

          set({ loading: false })
          return { data, error }
        } catch (error) {
          console.error('[Auth] Sign in error:', error)
          set({ loading: false })
          return { data: null, error }
        }
      },

      // Google Sign In
      signInWithGoogle: async () => {
        if (!isSupabaseConfigured || !supabase) {
          console.warn('Supabase is not configured. Skipping Google sign in.')
          return { data: null, error: { message: 'Supabase is not configured.' } }
        }

        try {
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          })
          return { data, error }
        } catch (error) {
          return { data: null, error }
        }
      },

      // Update user profile
      updateProfile: async (updates) => {
        if (!isSupabaseConfigured || !supabase) {
          console.warn('Supabase is not configured. Skipping profile update.')
          return { data: null, error: { message: 'Supabase is not configured.' } }
        }

        const { user } = get()
        if (!user) return { error: { message: 'No user logged in' } }

        try {
          // Only send known valid columns to Supabase to avoid "column does not exist" errors
          const ALLOWED_PROFILE_FIELDS = [
            'full_name', 'phone', 'bio', 'university', 'company',
            'instagram', 'linkedin', 'avatar_url', 'user_role'
          ]
          const sanitizedUpdates = Object.fromEntries(
            Object.entries(updates).filter(([key]) => ALLOWED_PROFILE_FIELDS.includes(key))
          )

          // Preserve existing user_role so upsert INSERT path doesn't fail
          const existingRole = get().profile?.userRole || 'user'
          const { error } = await supabase
            .from('profiles')
            .upsert(
              { id: user.id, email: user.email, user_role: existingRole, ...sanitizedUpdates },
              { onConflict: 'id' }
            )

          if (error) {
            console.error('[AuthStore] Profile upsert failed:', error);
            return { data: null, error };
          }

          // After a successful upsert, re-fetch the profile fresh from DB
          const { data: freshProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle()

          console.log('[AuthStore] Fresh profile after upsert:', freshProfile);

          if (freshProfile) {
            const transformedProfile = transformProfile(freshProfile)
            set({ profile: transformedProfile })
          }

          return { data: freshProfile, error: null }
        } catch (error) {
          console.error('[AuthStore] Profile update exception:', error);
          return { data: null, error }
        }
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
        if (!isSupabaseConfigured || !supabase) {
          console.warn('Supabase is not configured. Clearing local state only.')
          set({
            user: null,
            profile: null,
            session: null,
            loading: false,
          })
          return { error: null }
        }

        try {
          console.log('[Auth] Signing out...')
          const { error } = await supabase.auth.signOut()

          // Always clear local state
          set({
            user: null,
            profile: null,
            session: null,
            loading: false,
          })

          if (error) {
            console.error('[Auth] Error signing out:', error)
            return { error }
          }

          console.log('[Auth] Signed out successfully')
          return { error: null }
        } catch (error) {
          console.error('[Auth] Unexpected error during sign out:', error)
          // Still clear local state
          set({
            user: null,
            profile: null,
            session: null,
            loading: false,
          })
          return { error }
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist essential auth data
      // Note: Don't persist 'initialized' to avoid timing issues on app reload
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        profile: state.profile,
      }),
      // Handle hydration
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log('[Auth] State rehydrated from localStorage')
          // Set loading to false after rehydration
          state.loading = false
        }
      },
    }
  )
)

export default useAuthStore