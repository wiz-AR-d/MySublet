import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Home, Calendar, MessageSquare, DollarSign, PlusCircle, Search, User} from 'lucide-react'
import useAuthStore from '../store/authStore'
import {useListings} from '../hooks/useListings'
import {useBookings} from '../hooks/useBookings'
import {messagesAPI} from '../services/api/messages'

export default function Dashboard() {
  const {user, profile} = useAuthStore()

  // Fetch user's listings - ALL statuses (removed role check)
  const {listings: myListings, loading: listingsLoading} = useListings(
    user?.id ? {userId: user.id} : {}
  )

  // Fetch all bookings (for both roles)
  const {bookings, loading: bookingsLoading} = useBookings(user?.id)

  // Fetch unread messages count
  const [unreadCount, setUnreadCount] = useState(0)
  const [messagesLoading, setMessagesLoading] = useState(true)

  // Stats state
  const [stats, setStats] = useState({
    myListings: 0,
    activeBookings: 0,
    pendingBookings: 0,
    unreadMessages: 0,
    totalEarnings: 0,
    upcomingStays: 0,
  })

  // Fetch unread messages
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!user?.id) {
        setMessagesLoading(false)
        return
      }

      try {
        const {data: conversations, error} = await messagesAPI.getConversations()

        if (error) {
          console.error('Error fetching messages:', error)
          setUnreadCount(0)
        } else {
          const unread = conversations?.reduce((sum, conv) => sum + (conv.unreadCount || 0), 0) || 0
          setUnreadCount(unread)
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
        setUnreadCount(0)
      } finally {
        setMessagesLoading(false)
      }
    }

    fetchUnreadCount()
  }, [user?.id])

  // Calculate stats based on fetched data (removed role checks)
  useEffect(() => {
    if (!user?.id) return

    const newStats = {
      myListings: myListings?.length || 0,
      activeBookings: 0,
      pendingBookings: 0,
      unreadMessages: unreadCount,
      totalEarnings: 0,
      upcomingStays: 0,
    }

    if (bookings) {
      // Booking requests for user's listings
      const myListingBookings = bookings.filter(
        b => b.listing?._supabase?.user_id === user.id
      )

      newStats.pendingBookings = myListingBookings.filter(
        b => b.status === 'pending'
      ).length

      // Calculate earnings from confirmed bookings
      const confirmedBookings = myListingBookings.filter(
        b => b.status === 'confirmed'
      )

      newStats.totalEarnings = Math.round(
        confirmedBookings.reduce((sum, booking) => {
          return sum + (parseFloat(booking.total_price) || 0)
        }, 0)
      )

      // Active bookings (pending + confirmed)
      newStats.activeBookings = bookings.filter(
        b => b.status === 'confirmed' || b.status === 'pending'
      ).length

      // Upcoming stays (confirmed bookings with start_date in future)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      newStats.upcomingStays = bookings.filter(b => {
        if (b.status !== 'confirmed') return false
        const startDate = new Date(b.start_date)
        return startDate >= today
      }).length
    }

    setStats(newStats)
  }, [myListings, bookings, unreadCount, user?.id])

  // Get recent items for display
  const recentListings = myListings?.slice(0, 3) || []
  const recentBookings = bookings?.filter(b => b.listing?._supabase?.user_id === user?.id).slice(0, 3) || []

  // Overall loading state
  const loading = listingsLoading || bookingsLoading || messagesLoading

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Format price helper
  const formatPrice = (price) => {
    return parseFloat(price || 0).toLocaleString('en-US')
  }

  // Status badge color helper - Updated for Dark Mode
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-300 border border-green-500/30'
      case 'confirmed':
        return 'bg-green-500/20 text-green-300 border border-green-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Header */}
        <div className="mb-12 animate-fade-in-down">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{profile?.fullName || user?.email?.split('@')[0] || 'User'}</span>
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  {profile?.university && (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      {profile.university}
                    </>
                  )}
                </span>
              </div>
            </div>
            <Link
              to="/profile"
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <User className="h-4 w-4 text-gray-300 group-hover:text-white transition-colors" />
              <span className="text-gray-300 group-hover:text-white font-medium transition-colors">Edit Profile</span>
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin-reverse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid - Unified for all users */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up">
            {/* My Listings */}
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500/20 p-3 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                  <Home className="h-6 w-6 text-blue-400" />
                </div>
                <span className="text-xs font-medium text-blue-300/80 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">Active</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {stats.myListings}
              </h3>
              <p className="text-gray-400 text-sm font-medium">My Listings</p>
            </div>

            {/* Booking Requests */}
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-500/20 p-3 rounded-xl group-hover:bg-yellow-500/30 transition-colors">
                  <Calendar className="h-6 w-6 text-yellow-400" />
                </div>
                <span className="text-xs font-medium text-yellow-300/80 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">Pending</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {stats.pendingBookings}
              </h3>
              <p className="text-gray-400 text-sm font-medium">Booking Requests</p>
            </div>

            {/* Unread Messages */}
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500/20 p-3 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                  <MessageSquare className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-xs font-medium text-purple-300/80 bg-purple-500/10 px-2 py-1 rounded-full border border-purple-500/20">New</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {stats.unreadMessages}
              </h3>
              <p className="text-gray-400 text-sm font-medium">Unread Messages</p>
            </div>

            {/* Total Earnings */}
            <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10 hover:border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-500/20 p-3 rounded-xl group-hover:bg-green-500/30 transition-colors">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
                <span className="text-xs font-medium text-green-300/80 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">Total</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                ${formatPrice(stats.totalEarnings)}
              </h3>
              <p className="text-gray-400 text-sm font-medium">Total Earnings</p>
            </div>
          </div>
        )}

        {/* Quick Actions - Unified for all users */}
        <div className="mb-12 animate-fade-in-up animation-delay-200">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              to="/create-listing"
              className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-green-500/20 transition-colors"></div>
              <div className="relative z-10 flex flex-col items-start gap-4">
                <div className="p-3 bg-green-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <PlusCircle className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">Create Listing</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">List your apartment</p>
                </div>
              </div>
            </Link>

            <Link
              to="/my-listings"
              className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors"></div>
              <div className="relative z-10 flex flex-col items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Home className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">My Listings</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Manage properties</p>
                </div>
              </div>
            </Link>

            <Link
              to="/listings"
              className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-colors"></div>
              <div className="relative z-10 flex flex-col items-start gap-4">
                <div className="p-3 bg-purple-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Search className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">Search Listings</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Find a home</p>
                </div>
              </div>
            </Link>

            <Link
              to="/messages"
              className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-orange-500/20 transition-colors"></div>
              <div className="relative z-10 flex flex-col items-start gap-4">
                <div className="p-3 bg-orange-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">Messages</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Chat with others</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity - Unified for all users */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up animation-delay-400">
            {/* My Listings */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Home className="w-5 h-5 text-blue-400" />
                  My Listings
                </h2>
                {recentListings.length > 0 && (
                  <Link to="/my-listings" className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">
                    View All
                  </Link>
                )}
              </div>

              {recentListings.length > 0 ? (
                <div className="space-y-4">
                  {recentListings.map((listing) => (
                    <Link
                      key={listing.id}
                      to={`/listings/${listing.id}`}
                      className="group flex items-center gap-4 p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <img
                        src={listing.images?.[0] || 'https://via.placeholder.com/80'}
                        alt={listing.title}
                        className="w-16 h-16 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors">{listing.title}</h3>
                        <p className="text-sm text-gray-400 truncate">{listing.location}</p>
                        <p className="text-sm font-medium text-gray-300 mt-1">
                          ${formatPrice(listing.price)}/mo
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(listing._supabase?.status || 'active')}`}>
                        {listing._supabase?.status || 'Active'}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-xl">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400 mb-6">You haven't created any listings yet</p>
                  <Link
                    to="/create-listing"
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create Listing
                  </Link>
                </div>
              )}
            </div>

            {/* Booking Requests */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                  Booking Requests
                </h2>
                {recentBookings.length > 0 && (
                  <Link to="/bookings" className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">
                    View All
                  </Link>
                )}
              </div>

              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-white">
                            {booking.listing?.title || 'Listing'}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            Tenant: <span className="text-gray-300">{booking.tenant?.name || 'Unknown'}</span>
                          </p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400 pt-3 border-t border-white/5">
                        <p>{formatDate(booking.start_date)} - {formatDate(booking.end_date)}</p>
                        <p className="font-bold text-white">
                          ${formatPrice(booking.total_price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-xl">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-gray-500" />
                  </div>
                  <p className="text-gray-400 mb-2">No booking requests yet</p>
                  <p className="text-sm text-gray-600">
                    Requests will appear here once you have listings
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}