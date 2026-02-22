import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Users,
  Calendar,
  Home,
  CheckCircle,
  Mail,
  Phone,
  University
} from 'lucide-react'
import useAuthStore from '../store/authStore'
import { listingsAPI } from '../services/api/listings'
import { useListingStore } from '../store/listingStore'
import { convertPrice, getCurrencySymbol } from '../utils/currency'
import Loading from '../components/common/Loading'
import { toast } from 'sonner'

export default function ListingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { selectedCurrency } = useListingStore()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true)
      const { data, error } = await listingsAPI.getById(id)
      
      if (error) {
        toast.error('Failed to load listing')
        console.error('Error fetching listing:', error)
      } else if (data) {
        setListing(data)
      }
      
      setLoading(false)
    }
    
    fetchListing()
  }, [id])

  const handleMessageHost = () => {
    if (!user) {
      toast.error('Please login to message the host')
      navigate('/login', { state: { from: `/listings/${id}` } })
      return
    }
    
    if (listing._supabase?.user_id === user.id) {
      toast.error("You can't message yourself")
      return
    }
    
    navigate(`/messages?userId=${listing._supabase.user_id}&listingId=${listing.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing not found</h1>
          <Link 
            to="/listings"
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Listings
          </Link>
        </div>
      </div>
    )
  }

  const isOwner = listing._supabase?.user_id === user?.id
  const convertedPrice = Math.round(convertPrice(listing.price, 'USD', selectedCurrency))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          to="/listings"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative aspect-video">
                <img 
                  src={listing.images[currentImageIndex]} 
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {listing.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black bg-opacity-50 rounded-full px-3 py-2">
                    {listing.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {listing.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2 p-4">
                  {listing.images.slice(0, 5).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-blue-600' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${listing.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title and Location */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <p>{listing.location}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {listing.postedTime}
                </span>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Bedrooms</p>
                    <p className="font-semibold">{listing.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Bathrooms</p>
                    <p className="font-semibold">{listing.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Roommates</p>
                    <p className="font-semibold">
                      {Array.isArray(listing.roommates) && listing.roommates.length > 0
                        ? listing.roommates.length
                        : 'None'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-semibold">{listing.roomType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
            </div>

            {/* Amenities */}
            {listing.amenities && listing.amenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {listing.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Availability</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Available From</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <p className="font-medium">
                      {listing._supabase?.available_from 
                        ? new Date(listing._supabase.available_from).toLocaleDateString()
                        : 'Not specified'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Available To</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <p className="font-medium">
                      {listing._supabase?.available_to 
                        ? new Date(listing._supabase.available_to).toLocaleDateString()
                        : 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 space-y-6">
              {/* Price */}
              <div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {getCurrencySymbol(selectedCurrency)}{convertedPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                {selectedCurrency !== 'USD' && (
                  <p className="text-sm text-gray-500">
                    Original: ${listing.price.toLocaleString()} USD
                  </p>
                )}
              </div>

              {/* Message Host Button */}
              {!isOwner ? (
                <button
                  onClick={handleMessageHost}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  Message Host
                </button>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <p className="text-blue-800 text-sm font-medium">This is your listing</p>
                </div>
              )}

              {/* Host Info */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Host Information</h3>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={listing.host.avatar}
                    alt={listing.host.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/48'
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{listing.host.name}</p>
                    <p className="text-sm text-gray-500">Host</p>
                  </div>
                </div>
                
                {/* Additional Host Details (if available from profiles) */}
                {listing._supabase && (
                  <div className="space-y-2 text-sm">
                    {listing._supabase.university && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <University className="h-4 w-4" />
                        <span>{listing._supabase.university}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Pet Policy */}
              {listing.petPolicy && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Pet Policy</h3>
                  <p className="text-gray-700">{listing.petPolicy}</p>
                </div>
              )}

              {/* Views Count */}
              {listing._supabase?.views_count > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 text-center">
                    {listing._supabase.views_count} view{listing._supabase.views_count !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}