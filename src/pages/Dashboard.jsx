import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Home, Calendar, MessageSquare, DollarSign, PlusCircle, Search, User } from 'lucide-react'
import useAuthStore from '../store/authStore'

export default function Dashboard() {
  const { user, profile, isSublessor, isSublessee } = useAuthStore()
  const [stats, setStats] = useState({
    myListings: 0,
    activeBookings: 0,
    unreadMessages: 0,
    totalEarnings: 0,
  })

  const userIsSublessor = isSublessor()
  const userIsSublessee = isSublessee()

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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Conditional Stats based on Role */}
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
                  {stats.activeBookings}
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
                  <span className="text-sm text-gray-500">This Month</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  ${stats.totalEarnings}
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
                  0
                </h3>
                <p className="text-gray-600 text-sm">Upcoming Stays</p>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions - Different for each role */}
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

        {/* Recent Activity - Different for each role */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {userIsSublessor ? (
            <>
              {/* My Listings */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">My Listings</h2>
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
              </div>

              {/* Booking Requests */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Requests</h2>
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No booking requests yet</p>
                  <p className="text-sm text-gray-500">
                    Once you create a listing, booking requests will appear here
                  </p>
                </div>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">My Bookings</h2>
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}