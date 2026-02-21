import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { toast } from 'sonner'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (!isSupabaseConfigured || !supabase) {
        console.warn('Supabase is not configured. Redirecting to home.')
        toast.warning('Authentication service is not configured yet.')
        navigate('/')
        return
      }

      try {
        // Get the current session
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        if (session?.user) {
          console.log('OAuth login successful, redirecting to dashboard')
          toast.success('Logged in successfully!')
          navigate('/dashboard')
        } else {
          throw new Error('No session found')
        }
      } catch (error) {
        console.error('OAuth callback error:', error)
        toast.error('Authentication failed. Please try again.')
        navigate('/login')
      }
    }

    handleOAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Setting up your account...</p>
      </div>
    </div>
  )
}