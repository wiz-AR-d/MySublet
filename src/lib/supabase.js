import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

//updated on 11/20/2025 1:45 pm

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables')

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase environment variables are missing. Backend features will be disabled until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  )
}

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

//
