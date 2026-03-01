import {Link, useNavigate, useLocation} from 'react-router-dom'
import {Home, PlusCircle, MessageSquare, User, LogOut, Menu, ChevronDown, LayoutDashboard, List, HelpCircle, Bookmark} from 'lucide-react'
import useAuthStore from '../../store/authStore'
import {useState, useRef, useEffect} from 'react'
import {toast} from 'sonner'

export default function Header() {
  const {user, signOut} = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleSignOut = () => {
    // Close dropdown
    setDropdownOpen(false)

    // Call signOut which clears state immediately (non-blocking)
    // This makes logout feel instant
    signOut()

    // Show success and navigate immediately (don't wait for async)
    toast.success('Logged out successfully')
    navigate('/')
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Check if we're on specific pages
  const isOnListings = location.pathname === '/listings' || location.pathname.startsWith('/listings/')
  const isOnCreateListing = location.pathname === '/create-listing'

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
                  <Link to="/create-listing" className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    List Your Place
                  </Link>
                )}
                <Link to="/messages" className="text-gray-700 hover:text-blue-600 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <div className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors">
                      <Menu className="h-4 w-4" />
                      <User className="h-5 w-5" />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <Link
                        to="/my-listings"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Home className="h-4 w-4" />
                        <span className="font-medium">My Listings</span>
                      </Link>
                      <Link
                        to="/saved-listings"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Bookmark className="h-4 w-4" />
                        <span className="font-medium">Saved Listings</span>
                      </Link>
                      <Link
                        to="/messages"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span className="font-medium">Chat</span>
                      </Link>
                      <Link
                        to="/listings"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <List className="h-4 w-4" />
                        <span className="font-medium">Listings</span>
                      </Link>
                      <Link
                        to="/create-listing"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span className="font-medium">List Your Place</span>
                      </Link>
                      <Link
                        to="/faq"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <HelpCircle className="h-4 w-4" />
                        <span className="font-medium">FAQ</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span className="font-medium">Profile</span>
                      </Link>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="font-medium">Log out</span>
                      </button>
                    </div>
                  )}
                </div>
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
                  to="/dashboard"
                  className="block text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/my-listings"
                  className="block text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Listings
                </Link>
                <Link
                  to="/messages"
                  className="block text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Chat
                </Link>
                <Link
                  to="/listings"
                  className="block text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Listings
                </Link>
                <Link
                  to="/faq"
                  className="block text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleSignOut()
                  }}
                  className="block w-full text-left text-base text-red-600 hover:text-red-700 transition-colors font-medium"
                >
                  Log out
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