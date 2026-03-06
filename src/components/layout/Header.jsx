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
    setDropdownOpen(false)
    signOut()
    toast.success('Logged out successfully')
    navigate('/')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isOnListings = location.pathname === '/listings' || location.pathname.startsWith('/listings/')
  const isOnCreateListing = location.pathname === '/create-listing'

  return (
    <header className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Home className="h-6 w-6 text-blue-500 group-hover:text-blue-400 transition-colors" />
            <span className="text-xl font-bold text-white tracking-tight group-hover:text-gray-200 transition-colors">SubLease</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isOnListings && (
              <Link to="/listings" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Browse Listings
              </Link>
            )}

            {user ? (
              <>
                {!isOnCreateListing && (
                  <Link to="/create-listing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    List Your Place
                  </Link>
                )}
                <Link to="/messages" className="text-gray-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                  <MessageSquare className="h-5 w-5" />
                </Link>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-all">
                      <Menu className="h-4 w-4" />
                      <User className="h-5 w-5 bg-gray-700 rounded-full p-0.5" />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-neutral-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 py-2 overflow-hidden animate-fade-in-up origin-top-right">
                      <div className="px-4 py-3 border-b border-white/10 mb-2">
                        <p className="text-sm text-white font-medium truncate">{user.email}</p>
                      </div>

                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <Link
                        to="/my-listings"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Home className="h-4 w-4" />
                        <span className="font-medium">My Listings</span>
                      </Link>
                      <Link
                        to="/saved-listings"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Bookmark className="h-4 w-4" />
                        <span className="font-medium">Saved Listings</span>
                      </Link>
                      <Link
                        to="/messages"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span className="font-medium">Chat</span>
                      </Link>
                      <Link
                        to="/listings"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <List className="h-4 w-4" />
                        <span className="font-medium">Browse Listings</span>
                      </Link>
                      <Link
                        to="/create-listing"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span className="font-medium">List Your Place</span>
                      </Link>
                      <Link
                        to="/faq"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <HelpCircle className="h-4 w-4" />
                        <span className="font-medium">FAQ</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span className="font-medium">Profile</span>
                      </Link>

                      <div className="my-2 border-t border-white/10" />

                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full text-left"
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
                <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-blue-500 transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-neutral-900/95 backdrop-blur-xl border-t border-white/10 absolute left-0 right-0 px-4 shadow-xl">
            {!isOnListings && (
              <Link
                to="/listings"
                className="block text-base text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Listings
              </Link>
            )}
            {user ? (
              <>
                {!isOnCreateListing && (
                  <Link
                    to="/create-listing"
                    className="block text-base text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    List Your Place
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="block text-base text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/my-listings"
                  className="block text-base text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Listings
                </Link>
                <Link
                  to="/messages"
                  className="block text-base text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Chat
                </Link>
                <Link
                  to="/profile"
                  className="block text-base text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <div className="border-t border-white/10 my-2" />
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleSignOut()
                  }}
                  className="block w-full text-left text-base text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-3 rounded-lg transition-colors font-medium"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="space-y-3 pt-2">
                <Link
                  to="/login"
                  className="block text-base text-center text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-blue-600 text-white text-base font-bold px-5 py-3 rounded-xl text-center hover:bg-blue-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}