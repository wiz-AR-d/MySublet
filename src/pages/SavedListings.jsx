// src/pages/SavedListings.jsx
import { Link } from 'react-router-dom'
import { Bookmark, Home, AlertCircle, Trash2, Eye, MapPin, DollarSign, Bed, Bath } from 'lucide-react'
import { useSavedListings } from '../hooks/useSavedListings'
import { toast } from 'sonner'

export default function SavedListings() {
  const { savedListings, loading, toggleSave, isListingSaved } = useSavedListings()

  const formatPrice = (price) => {
    return parseFloat(price || 0).toLocaleString('en-US')
  }

  const handleRemove = async (listingId) => {
    const result = await toggleSave(listingId)
    if (result.success) {
      toast.success('Listing removed from bookmarks')
    } else {
      toast.error('Failed to remove listing')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your saved listings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bookmark className="h-8 w-8 text-blue-600" />
            Saved Listings
          </h1>
          <p className="text-gray-600 mt-2">
            {savedListings.length} {savedListings.length === 1 ? 'listing' : 'listings'} saved
          </p>
        </div>

        {/* Listings Grid */}
        {savedListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedListings.map((listing) => (
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
                  
                  {/* Bookmark indicator */}
                  <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg">
                    <Bookmark className="h-5 w-5 text-blue-600 fill-blue-600" />
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
                      <span className="line-clamp-1">{listing.location || listing.city}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{listing.bedrooms || listing.total_rooms} bed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{listing.bathrooms} bath</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold text-gray-900">
                          ${formatPrice(listing.price || listing.monthly_rent)}/mo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    <Link
                      to={`/listings/${listing.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>

                    <button
                      onClick={() => handleRemove(listing.id)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Bookmark className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No saved listings yet
            </h2>
            <p className="text-gray-600 mb-8">
              Start bookmarking listings you're interested in to view them here
            </p>
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="h-5 w-5" />
              Browse Listings
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
