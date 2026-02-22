import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home, Calendar, MessageSquare, DollarSign, PlusCircle, Search, User } from 'lucide-react'
import useAuthStore from '../store/authStore'
import { useListings } from '../hooks/useListings'
import { useBookings } from '../hooks/useBookings'
import { messagesAPI } from '../services/api/messages'

export default function Dashboard() {
  const { user, profile, isSublessor, isSublessee } = useAuthStore()
  const userIsSublessor = isSublessor()
  const userIsSublessee = isSublessee()

  // Fetch user's listings (only for sublessors) - ALL statuses
  const { listings: myListings, loading: listingsLoading } = useListings(
    userIsSublessor && user?.id ? { userId: user.id } : {}
  )

  // Fetch all bookings (for both roles)
  const { bookings, loading: bookingsLoading } = useBookings(user?.id)

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
        const { data: conversations, error } = await messagesAPI.getConversations()
        
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

  // Calculate stats based on fetched data
  useEffect(() => {
    if (!user?.id) return

    const newStats = {
      myListings: 0,
      activeBookings: 0,
      pendingBookings: 0,
      unreadMessages: unreadCount,
      totalEarnings: 0,
      upcomingStays: 0,
    }

    if (userIsSublessor) {
      // Stats for Sublessors
      newStats.myListings = myListings?.length || 0

      if (bookings) {
        // Booking requests for sublessor's listings
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
      }
    } else if (userIsSublessee) {
      // Stats for Sublessees
      if (bookings) {
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
    }

    setStats(newStats)
  }, [myListings, bookings, unreadCount, userIsSublessor, userIsSublessee, user?.id])

  // Get recent items for display
  const recentListings = myListings?.slice(0, 3) || []
  const recentBookings = userIsSublessor
    ? bookings?.filter(b => b.listing?._supabase?.user_id === user?.id).slice(0, 3) || []
    : bookings?.slice(0, 3) || []

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

  // Status badge color helper
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {profile?.full_name || user?.email?.split('@')[0] || 'User'}!
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  userIsSublessor 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {userIsSublessor ? (
                    <>
                      <Home className="h-3 w-3 mr-1" />
                      Sublessor
                    </>
                  ) : (
                    <>
                      <Search className="h-3 w-3 mr-1" />
                      Sublessee
                    </>
                  )}
                </span>
                <span className="text-gray-600 text-sm">
                  {profile?.university && `• ${profile.university}`}
                </span>
              </div>
            </div>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <User className="h-4 w-4" />
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Stats Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {userIsSublessor ? (
              <>
                {/* My Listings */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Home className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-500">Active</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stats.myListings}
                  </h3>
                  <p className="text-gray-600 text-sm">My Listings</p>
                </div>

                {/* Booking Requests */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <Calendar className="h-6 w-6 text-yellow-600" />
                    </div>
                    <span className="text-sm text-gray-500">Pending</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stats.pendingBookings}
                  </h3>
                  <p className="text-gray-600 text-sm">Booking Requests</p>
                </div>

                {/* Unread Messages */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-500">New</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stats.unreadMessages}
                  </h3>
                  <p className="text-gray-600 text-sm">Unread Messages</p>
                </div>

                {/* Total Earnings */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-500">Total</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    ${formatPrice(stats.totalEarnings)}
                  </h3>
                  <p className="text-gray-600 text-sm">Total Earnings</p>
                </div>
              </>
            ) : (
              <>
                {/* Saved Listings */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Home className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-500">Saved</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    0
                  </h3>
                  <p className="text-gray-600 text-sm">Saved Listings</p>
                </div>

                {/* My Bookings */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-500">Active</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stats.activeBookings}
                  </h3>
                  <p className="text-gray-600 text-sm">My Bookings</p>
                </div>

                {/* Unread Messages */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-500">New</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stats.unreadMessages}
                  </h3>
                  <p className="text-gray-600 text-sm">Unread Messages</p>
                </div>

                {/* Upcoming Stays */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <Calendar className="h-6 w-6 text-yellow-600" />
                    </div>
                    <span className="text-sm text-gray-500">Soon</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stats.upcomingStays}
                  </h3>
                  <p className="text-gray-600 text-sm">Upcoming Stays</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userIsSublessor ? (
              <>
                <Link
                  to="/create-listing"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <PlusCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Create Listing</h3>
                    <p className="text-sm text-gray-600">List your apartment</p>
                  </div>
                </Link>

                <Link
                  to="/my-listings"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <Home className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">My Listings</h3>
                    <p className="text-sm text-gray-600">Manage your properties</p>
                  </div>
                </Link>

                <Link
                  to="/messages"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <MessageSquare className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Messages</h3>
                    <p className="text-sm text-gray-600">Chat with renters</p>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/listings"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <Search className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Search Listings</h3>
                    <p className="text-sm text-gray-600">Find your summer home</p>
                  </div>
                </Link>

                <Link
                  to="/my-bookings"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">My Bookings</h3>
                    <p className="text-sm text-gray-600">View your reservations</p>
                  </div>
                </Link>

                <Link
                  to="/messages"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Messages</h3>
                    <p className="text-sm text-gray-600">Chat with hosts</p>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {userIsSublessor ? (
              <>
                {/* My Listings */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">My Listings</h2>
                    {recentListings.length > 0 && (
                      <Link to="/my-listings" className="text-sm text-blue-600 hover:text-blue-700">
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
                          className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <img
                            src={listing.images?.[0] || 'https://via.placeholder.com/80'}
                            alt={listing.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{listing.title}</h3>
                            <p className="text-sm text-gray-600 truncate">{listing.location}</p>
                            <p className="text-sm font-medium text-gray-900">
                              ${formatPrice(listing.price)}/mo
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(listing._supabase?.status || 'active')}`}>
                            {listing._supabase?.status || 'Active'}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">You haven't created any listings yet</p>
                      <Link
                        to="/create-listing"
                        className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                      >
                        Create Your First Listing
                      </Link>
                    </div>
                  )}
                </div>

                {/* Booking Requests */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Booking Requests</h2>
                    {recentBookings.length > 0 && (
                      <Link to="/bookings" className="text-sm text-blue-600 hover:text-blue-700">
                        View All
                      </Link>
                    )}
                  </div>
                  
                  {recentBookings.length > 0 ? (
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {booking.listing?.title || 'Listing'}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Tenant: {booking.tenant?.name || 'Unknown'}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>{formatDate(booking.start_date)} - {formatDate(booking.end_date)}</p>
                            <p className="font-medium text-gray-900 mt-1">
                              ${formatPrice(booking.total_price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No booking requests yet</p>
                      <p className="text-sm text-gray-500">
                        Once you create a listing, booking requests will appear here
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Saved Listings */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Saved Listings</h2>
                  <div className="text-center py-8">
                    <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">You haven't saved any listings yet</p>
                    <Link
                      to="/listings"
                      className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Browse Listings
                    </Link>
                  </div>
                </div>

                {/* My Bookings */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>
                    {recentBookings.length > 0 && (
                      <Link to="/my-bookings" className="text-sm text-blue-600 hover:text-blue-700">
                        View All
                      </Link>
                    )}
                  </div>
                  
                  {recentBookings.length > 0 ? (
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start gap-3 mb-2">
                            <img
                              src={booking.listing?.images?.[0] || 'https://via.placeholder.com/60'}
                              alt={booking.listing?.title || 'Listing'}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {booking.listing?.title || 'Listing'}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
                              </p>
                              <p className="text-sm font-medium text-gray-900 mt-1">
                                ${formatPrice(booking.total_price)}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">You don't have any bookings yet</p>
                      <Link
                        to="/listings"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Find Your Summer Home
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}