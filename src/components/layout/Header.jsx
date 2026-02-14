import { Link, useNavigate } from 'react-router-dom'
import { Home, PlusCircle, MessageSquare, User, LogOut, Menu } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Header() {
  const { user, profile, signOut, isSublessor } = useAuthStore()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = () => {
    // Call signOut which clears state immediately (non-blocking)
    // This makes logout feel instant
    signOut()
    
    // Show success and navigate immediately (don't wait for async)
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SubLease</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/listings" className="text-gray-700 hover:text-blue-600">
              Browse Listings
            </Link>
            
            {user ? (
              <>
                {/* Only show "List Your Place" for sublessors */}
                {isSublessor() && (
                  <Link to="/create-listing" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    List Your Place
                  </Link>
                )}
                <Link to="/messages" className="text-gray-700 hover:text-blue-600">
                  <MessageSquare className="h-5 w-5" />
                </Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-red-600 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
            <Link
              to="/listings"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Listings
            </Link>
            {user ? (
              <>
                {/* Only show "List Your Place" for sublessors */}
                {isSublessor() && (
                  <Link
                    to="/create-listing"
                    className="block text-gray-700 hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    List Your Place
                  </Link>
                )}
                <Link
                  to="/messages"
                  className="block text-gray-700 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  to="/dashboard"
                  className="block text-gray-700 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleSignOut()
                  }}
                  className="block w-full text-left text-gray-700 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700"
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
