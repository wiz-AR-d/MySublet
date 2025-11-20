import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import useAuthStore from '../store/authStore'
//updated on 11/20/2025 1:45 pm
// import { supabase } from '../lib/supabase'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
//
import { toast } from 'sonner'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { updateProfile } = useAuthStore()
  const [needsRole, setNeedsRole] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleOAuthCallback = async () => {
      //updated on 11/20/2025 1:45 pm
      if (!isSupabaseConfigured || !supabase) {
        console.warn('Supabase is not configured. Redirecting to home.')
        toast.warning('Authentication service is not configured yet.')
        navigate('/')
        return
      }
      //
      try {
        // Get the current session
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        
        if (session?.user) {
          // Check if profile exists and has a role
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('user_role')
            .eq('id', session.user.id)
            .single()

          if (profileError) {
            console.error('Profile fetch error:', profileError)
          }

          // If profile doesn't have a role, show role selection
          if (!profile?.user_role) {
            setNeedsRole(true)
          } else {
            // Profile has role, redirect to dashboard
            navigate('/dashboard')
          }
        }
      } catch (error) {
        console.error('OAuth callback error:', error)
        toast.error('Authentication failed. Please try again.')
        navigate('/login')
      }
    }

    handleOAuthCallback()
  }, [navigate])

  const handleRoleSelect = async (role) => {
    setLoading(true)
    setSelectedRole(role)

    try {
      //updated on 11/20/2025 1:45 pm
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('Supabase is not configured.')
      }
      //
      const { error } = await updateProfile({ user_role: role })
      
      if (error) throw error

      toast.success('Account created successfully!')
      navigate('/dashboard')
    } catch (error) {
      console.error('Error updating role:', error)
      toast.error('Failed to set account type. Please try again.')
      setLoading(false)
    }
  }

  if (!needsRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Setting up your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">One More Step!</h2>
            <p className="mt-2 text-gray-600">How do you plan to use SubLease?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sublessee Card */}
            <button
              onClick={() => handleRoleSelect('sublessee')}
              disabled={loading}
              className="p-8 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group disabled:opacity-50"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                I'm Looking for Housing
              </h3>
              <p className="text-gray-600 mb-4">
                Find and book short-term apartments for internships or summer stays
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  Search apartments by city and dates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  Message apartment owners
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  Book and pay securely
                </li>
              </ul>
            </button>

            {/* Sublessor Card */}
            <button
              onClick={() => handleRoleSelect('sublessor')}
              disabled={loading}
              className="p-8 border-2 border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left group disabled:opacity-50"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200">
                <Home className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                I'm Listing My Apartment
              </h3>
              <p className="text-gray-600 mb-4">
                Earn money by subletting your apartment while you're away
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                  Create apartment listings
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                  Manage availability & bookings
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                  Receive secure payments
                </li>
              </ul>
            </button>
          </div>

          {loading && (
            <div className="mt-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Setting up your account...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}