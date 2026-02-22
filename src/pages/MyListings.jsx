// src/pages/MyListings.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Home, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath,
  Calendar,
  TrendingUp,
  AlertCircle,
  Shield
} from 'lucide-react'
import useAuthStore from '../store/authStore'
import { useListings } from '../hooks/useListings'
import { listingsAPI } from '../services/api/listings'
import { toast } from 'sonner'
import { ListingVerificationBadge } from '../components/verification/VerificationBadge'

export default function MyListings() {
  const { user, profile, isSublessor } = useAuthStore()
  const navigate = useNavigate()
  const userIsSublessor = isSublessor()

  // State
  const [filter, setFilter] = useState('all') // all, active, inactive
  const [sortBy, setSortBy] = useState('newest') // newest, oldest, price-high, price-low
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [listingToDelete, setListingToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // Fetch listings - filter by user ID
  const { listings, loading, error, refetch } = useListings(
    user?.id ? { userId: user.id } : {}
  )

  // Check verification status
  const needsVerification = profile?.verificationStatus !== 'approved'
  const hasPendingListings = listings?.some(l => l.verificationStatus === 'pending') || false

  // Redirect if not sublessor
  useEffect(() => {
    if (!userIsSublessor && !loading) {
      toast.error('Only sublessors can access this page')
      navigate('/dashboard')
    }
  }, [userIsSublessor, loading, navigate])

  // Filter listings
  const filteredListings = listings?.filter(listing => {
    if (filter === 'all') return true
    if (filter === 'active') return listing._supabase?.status === 'active'
    if (filter === 'inactive') return listing._supabase?.status === 'inactive'
    return true
  }) || []

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b._supabase?.created_at) - new Date(a._supabase?.created_at)
      case 'oldest':
        return new Date(a._supabase?.created_at) - new Date(b._supabase?.created_at)
      case 'price-high':
        return b.price - a.price
      case 'price-low':
        return a.price - b.price
      default:
        return 0
    }
  })

  // Calculate stats
  const stats = {
    total: listings?.length || 0,
    active: listings?.filter(l => l._supabase?.status === 'active').length || 0,
    inactive: listings?.filter(l => l._supabase?.status === 'inactive').length || 0,
    totalViews: listings?.reduce((sum, l) => sum + (l._supabase?.views_count || 0), 0) || 0
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Format price
  const formatPrice = (price) => {
    return parseFloat(price || 0).toLocaleString('en-US')
  }

  // Handle delete
  const handleDeleteClick = (listing) => {
    setListingToDelete(listing)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!listingToDelete) return

    setDeleting(true)
    try {
      const { error } = await listingsAPI.delete(listingToDelete.id)
      
      if (error) {
        toast.error('Failed to delete listing')
        console.error('Delete error:', error)
      } else {
        toast.success('Listing deleted successfully')
        refetch() // Refresh the list
        setDeleteModalOpen(false)
        setListingToDelete(null)
      }
    } catch (error) {
      toast.error('An error occurred while deleting')
      console.error('Delete error:', error)
    } finally {
      setDeleting(false)
    }
  }

  // Handle status toggle
  const handleToggleStatus = async (listing) => {
    const newStatus = listing._supabase?.status === 'active' ? 'inactive' : 'active'
    
    try {
      const { error } = await listingsAPI.update(listing.id, { status: newStatus }, user.id)
      
      if (error) {
        toast.error(`Failed to ${newStatus === 'active' ? 'activate' : 'deactivate'} listing`)
        console.error('Update error:', error)
      } else {
        toast.success(`Listing ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`)
        refetch() // Refresh the list
      }
    } catch (error) {
      toast.error('An error occurred while updating status')
      console.error('Update error:', error)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your listings...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Listings</h2>
          <p className="text-gray-600 mb-6">We couldn't load your listings. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
              <p className="text-gray-600 mt-1">Manage your apartment listings</p>
            </div>
            <Link
              to="/create-listing"
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              Create New Listing
            </Link>
          </div>
        </div>

        {/* Verification Alert Banner */}
        {needsVerification && hasPendingListings && (
          <div className="mb-6 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Verify your identity to publish your listings
                </h3>
                <p className="text-gray-700 mb-4">
                  {profile?.verificationStatus === 'pending' 
                    ? "We're reviewing your verification. This usually takes 5-30 minutes. Your listings will go live automatically once approved."
                    : "Your listings are waiting for you to verify your identity. This takes less than 1 minute."}
                </p>
                {profile?.verificationStatus !== 'pending' && (
                  <Link
                    to="/verify-identity"
                    className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-medium"
                  >
                    Start Verification
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Home className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Total Listings</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Active</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Home className="h-5 w-5 text-gray-600" />
              </div>
              <span className="text-sm text-gray-600">Inactive</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Eye className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Total Views</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'active'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active ({stats.active})
              </button>
              <button
                onClick={() => setFilter('inactive')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'inactive'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Inactive ({stats.inactive})
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {sortedListings.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedListings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={listing.images?.[0] || 'https://via.placeholder.com/400x300'}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Verification Badge */}
                  <div className="absolute top-3 right-3">
                    <ListingVerificationBadge 
                      status={listing.verificationStatus || 'pending'} 
                      size="sm" 
                    />
                  </div>
                  
                  {/* Views Counter */}
                  <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded flex items-center gap-1">
                    <Eye className="h-3 w-3 text-gray-600" />
                    <span className="text-xs font-medium text-gray-700">
                      {listing._supabase?.views_count || 0} views
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                    {listing.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{listing.location}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{listing.bedrooms} bed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{listing.bathrooms} bath</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold text-gray-900">
                          ${formatPrice(listing.price)}/mo
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Available: {formatDate(listing._supabase?.available_from)} - {formatDate(listing._supabase?.available_to)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    {listing.verificationStatus === 'pending' ? (
                      <>
                        <button
                          disabled
                          className="flex-1 px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed text-sm"
                        >
                          Awaiting Verification
                        </button>
                        <Link
                          to={`/listings/${listing.id}/edit`}
                          className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/listings/${listing.id}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>

                        <Link
                          to={`/listings/${listing.id}/edit`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Link>

                        <button
                          onClick={() => handleToggleStatus(listing)}
                          className={`flex-1 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                            listing._supabase?.status === 'active'
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {listing._supabase?.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>

                        <button
                          onClick={() => handleDeleteClick(listing)}
                          className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Additional pending listing info */}
                  {listing.verificationStatus === 'pending' && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-start">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        This listing will go live once your identity is verified
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Home className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {filter === 'all' 
                ? 'No listings yet' 
                : `No ${filter} listings`}
            </h2>
            <p className="text-gray-600 mb-8">
              {filter === 'all'
                ? "Get started by creating your first listing"
                : `You don't have any ${filter} listings at the moment`}
            </p>
            {filter === 'all' ? (
              <Link
                to="/create-listing"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <PlusCircle className="h-5 w-5" />
                Create Your First Listing
              </Link>
            ) : (
              <button
                onClick={() => setFilter('all')}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Listings
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Delete Listing</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>"{listingToDelete?.title}"</strong>? 
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false)
                  setListingToDelete(null)
                }}
                disabled={deleting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}