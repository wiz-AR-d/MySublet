import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Home, PlusCircle, MessageSquare, User, LogOut, Menu } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Header() {
  const { user, signOut } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = () => {
    // Call signOut which clears state immediately (non-blocking)
    // This makes logout feel instant
    signOut()

    // Show success and navigate immediately (don't wait for async)
    toast.success('Logged out successfully')
    navigate('/')
  }

  // Check if we're on specific pages
  const isOnListings = location.pathname === '/listings' || location.pathname.startsWith('/listings/')
  const isOnCreateListing = location.pathname === '/create-listing'
  const isOnDashboard = location.pathname === '/dashboard'

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900 tracking-tight">SubLease</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isOnListings && (
              <Link to="/listings" className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Browse Listings
              </Link>
            )}

            {user ? (
              <>
                {/* Show "List Your Place" for all logged-in users */}
                {!isOnCreateListing && (
                  <Link to="/create-listing" className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    List Your Place
                  </Link>
                )}
                <Link to="/messages" className="text-gray-700 hover:text-blue-600 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </Link>
                {!isOnDashboard && (
                  <Link to="/dashboard" className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="text-base text-gray-700 hover:text-red-600 transition-colors font-medium flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white text-base font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {!isOnListings && (
              <Link
                to="/listings"
                className="block text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Listings
              </Link>
            )}
            {user ? (
              <>
                {/* Show "List Your Place" for all logged-in users */}
                {!isOnCreateListing && (
                  <Link
                    to="/create-listing"
                    className="block text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    List Your Place
                  </Link>
                )}
                <Link
                  to="/messages"
                  className="block text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Messages
                </Link>
                {!isOnDashboard && (
                  <Link
                    to="/dashboard"
                    className="block text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleSignOut()
                  }}
                  className="block w-full text-left text-base text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-blue-600 text-white text-base font-semibold px-5 py-2.5 rounded-lg text-center hover:bg-blue-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}