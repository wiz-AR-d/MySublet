// src/pages/MyListings.jsx
import {useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
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
  Shield,
  Filter,
  ArrowUpRight
} from 'lucide-react'
import useAuthStore from '../store/authStore'
import {useListings} from '../hooks/useListings'
import {listingsAPI} from '../services/api/listings'
import {toast} from 'sonner'
import {ListingVerificationBadge} from '../components/verification/VerificationBadge'

// Scroll Reveal Component
const ScrollReveal = ({children, delay = 0}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {threshold: 0.1}
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 transform ${isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10'
        }`}
      style={{transitionDelay: `${delay}ms`}}
    >
      {children}
    </div>
  )
}

export default function MyListings() {
  const {user, profile} = useAuthStore()
  const navigate = useNavigate()

  // State
  const [filter, setFilter] = useState('all') // all, active, cancelled
  const [sortBy, setSortBy] = useState('newest') // newest, oldest, price-high, price-low
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [listingToDelete, setListingToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  // Fetch listings - filter by user ID
  const {listings, loading, error, refetch} = useListings(
    user?.id ? {userId: user.id, status: 'all'} : {}
  )

  // Check verification status
  const needsVerification = profile?.verificationStatus !== 'approved'
  const hasPendingListings = listings?.some(l => l.verificationStatus === 'pending') || false

  // Filter listings
  const filteredListings = listings?.filter(listing => {
    if (filter === 'all') return true
    if (filter === 'active') return listing._supabase?.status === 'active'
    if (filter === 'inactive') return listing._supabase?.status === 'cancelled'
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
    inactive: listings?.filter(l => l._supabase?.status === 'cancelled').length || 0,
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
      const {error} = await listingsAPI.delete(listingToDelete.id)

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
    const newStatus = listing._supabase?.status === 'active' ? 'cancelled' : 'active'

    try {
      const {error} = await listingsAPI.update(listing.id, {status: newStatus}, user.id)

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin-reverse"></div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Listings</h2>
          <p className="text-gray-400 mb-6">We couldn't load your listings. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in-down">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">My Listings</h1>
              <p className="text-gray-400">Manage and track your property listings</p>
            </div>
            <Link
              to="/create-listing"
              className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-lg shadow-white/10"
            >
              <PlusCircle className="h-5 w-5" />
              Create New Listing
            </Link>
          </div>
        </div>

        {/* Verification Alert Banner */}
        {needsVerification && hasPendingListings && (
          <ScrollReveal>
            <div className="mb-8 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Verify your identity to publish your listings
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {profile?.verificationStatus === 'pending'
                      ? "We're reviewing your verification. This usually takes 5-30 minutes. Your listings will go live automatically once approved."
                      : "Your listings are waiting for you to verify your identity. This takes less than 1 minute."}
                  </p>
                  {profile?.verificationStatus !== 'pending' && (
                    <Link
                      to="/verify-identity"
                      className="inline-block bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition font-bold"
                    >
                      Start Verification
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-fade-in-up">
          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-500/20 p-2 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                <Home className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-sm text-gray-400">Total Listings</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-green-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-500/20 p-2 rounded-lg group-hover:bg-green-500/30 transition-colors">
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-sm text-gray-400">Active</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.active}</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-gray-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gray-500/20 p-2 rounded-lg group-hover:bg-gray-500/30 transition-colors">
                <Home className="h-5 w-5 text-gray-400" />
              </div>
              <span className="text-sm text-gray-400">Inactive</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.inactive}</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-500/20 p-2 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                <Eye className="h-5 w-5 text-purple-400" />
              </div>
              <span className="text-sm text-gray-400">Total Views</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalViews}</p>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-8 animate-fade-in-up animation-delay-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex gap-2 bg-black/20 p-1 rounded-xl w-fit">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${filter === 'all'
                  ? 'bg-white/10 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${filter === 'active'
                  ? 'bg-green-500/20 text-green-400 shadow-lg'
                  : 'text-gray-400 hover:text-green-400 hover:bg-white/5'
                  }`}
              >
                Active ({stats.active})
              </button>
              <button
                onClick={() => setFilter('inactive')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${filter === 'inactive'
                  ? 'bg-gray-500/20 text-gray-300 shadow-lg'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                  }`}
              >
                Inactive ({stats.inactive})
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/20 border border-white/10 text-white px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer hover:bg-black/40 transition-colors"
              >
                <option value="newest" className="bg-neutral-900">Newest First</option>
                <option value="oldest" className="bg-neutral-900">Oldest First</option>
                <option value="price-high" className="bg-neutral-900">Price: High to Low</option>
                <option value="price-low" className="bg-neutral-900">Price: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {sortedListings.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedListings.map((listing, index) => (
              <ScrollReveal key={listing.id} delay={index * 100}>
                <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={listing.images?.[0] || 'https://via.placeholder.com/400x300'}
                      alt={listing.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Verification Badge */}
                    <div className="absolute top-3 right-3">
                      <ListingVerificationBadge
                        status={listing.verificationStatus || 'pending'}
                        size="sm"
                      />
                    </div>

                    {/* Views Counter */}
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <Eye className="h-3 w-3 text-gray-300" />
                      <span className="text-xs font-medium text-gray-200">
                        {listing._supabase?.views_count || 0} views
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${listing._supabase?.status === 'active'
                        ? 'bg-green-500/20 border-green-500/30 text-green-300'
                        : 'bg-gray-500/20 border-gray-500/30 text-gray-300'
                        }`}>
                        {listing._supabase?.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
                      {listing.title}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="line-clamp-1">{listing.location}</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                          <Bed className="h-4 w-4 text-gray-400" />
                          <span>{listing.bedrooms} bed</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                          <Bath className="h-4 w-4 text-gray-400" />
                          <span>{listing.bathrooms} bath</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
                          <DollarSign className="h-4 w-4 text-green-400" />
                          <span className="font-bold text-green-400">
                            ${formatPrice(listing.price)}/mo
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>
                          {formatDate(listing._supabase?.available_from)} - {formatDate(listing._supabase?.available_to)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      {listing.verificationStatus === 'pending' ? (
                        <>
                          <button
                            disabled
                            className="flex-1 px-4 py-2.5 bg-white/5 text-gray-500 rounded-xl cursor-not-allowed text-sm font-medium border border-white/5"
                          >
                            Awaiting Verification
                          </button>
                          <Link
                            to={`/listings/${listing.id}/edit`}
                            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to={`/listings/${listing.id}`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20 text-sm font-bold"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Link>

                          <Link
                            to={`/listings/${listing.id}/edit`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Link>

                          <button
                            onClick={() => handleToggleStatus(listing)}
                            className={`flex-1 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium border ${listing._supabase?.status === 'active'
                              ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                              : 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20'
                              }`}
                          >
                            {listing._supabase?.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>

                          <button
                            onClick={() => handleDeleteClick(listing)}
                            className="px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors text-sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Additional pending listing info */}
                    {listing.verificationStatus === 'pending' && (
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-start">
                        <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-400">
                          This listing will go live once your identity is verified
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-16 text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Home className="h-10 w-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {filter === 'all'
                ? 'No listings yet'
                : `No ${filter} listings`}
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {filter === 'all'
                ? "Get started by creating your first listing. It only takes a few minutes to reach thousands of potential tenants."
                : `You don't have any ${filter} listings at the moment.`}
            </p>
            {filter === 'all' ? (
              <Link
                to="/create-listing"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 shadow-lg shadow-white/10"
              >
                <PlusCircle className="h-5 w-5" />
                Create Your First Listing
              </Link>
            ) : (
              <button
                onClick={() => setFilter('all')}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-500 transition-colors font-bold"
              >
                View All Listings
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-500/20 p-3 rounded-full">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">Delete Listing</h2>
            </div>

            <p className="text-gray-300 mb-8 text-lg">
              Are you sure you want to delete <strong className="text-white">"{listingToDelete?.title}"</strong>?
              This action cannot be undone.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setDeleteModalOpen(false)
                  setListingToDelete(null)
                }}
                disabled={deleting}
                className="flex-1 px-6 py-3 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 font-bold shadow-lg shadow-red-600/20"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
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
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}