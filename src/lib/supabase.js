import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// --- ABRUPT PURGE BEFORE CLIENT CREATION ---
// GoTrue's autoRefreshToken will fire an HTTP request THE MOMENT createClient()
// executes if a token exists. If that token is stale (e.g. Chrome's idle state),
// the entire app hangs for 5 seconds waiting for the refresh timeout.
// By detecting expiration synchronously and deleting the token first,
// GoTrue boots up clean and treats the user as instantly logged out.
if (typeof window !== 'undefined') {
  try {
    const raw = window.localStorage.getItem('sb-auth-token')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed?.expires_at && (Date.now() / 1000) > parsed.expires_at) {
        window.localStorage.removeItem('sb-auth-token')
        window.localStorage.removeItem('auth-storage')
        console.log('[Supabase] Purged dead session synchronously to prevent initialization hang')
      }
    }
  } catch(e) {}
}

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
        // Disable local locking to prevent infinite deadlock in Chrome
        lock: false,
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