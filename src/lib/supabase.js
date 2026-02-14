import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Use localStorage for session persistence
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        // Automatically refresh expired tokens
        autoRefreshToken: true,
        // Persist session to localStorage
        persistSession: true,
        // Detect session from URL (for OAuth callbacks)
        detectSessionInUrl: true,
        // Flow type - use implicit for web apps
        flowType: 'implicit',
        // Storage key - customize if needed
        storageKey: 'sb-auth-token',
        // Debug mode - set to true for troubleshooting
        debug: import.meta.env.DEV,
      },
    })
  : null

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ Supabase environment variables are missing. Backend features will be disabled until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  )
} else {
  console.log('✅ Supabase client initialized successfully')
  
  // Log storage check in development
  if (import.meta.env.DEV) {
    try {
      const testKey = 'sb-storage-test'
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)
      console.log('✅ localStorage is accessible')
    } catch (error) {
      console.error('❌ localStorage is not accessible:', error)
    }
  }
}