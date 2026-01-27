import { Navigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import useAuthStore from '../../store/authStore'

export default function ProtectedRoute({ children, requireRole = null }) {
  const { user, profile, loading } = useAuthStore()

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Check if specific role is required
  if (requireRole && profile?.user_role !== requireRole) {
    const roleName = requireRole === 'sublessor' ? 'apartment owners' : 'renters'
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            This page is only available for {roleName}.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Go Back
            </button>
            <a
              href="/dashboard"
              className="block w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    )
  }

  // User is authenticated and has correct role (or no role required)
  return children
}