// src/pages/ListingDetail.jsx
import {useParams, useNavigate, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
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
  University,
  Bookmark,
  Share2
} from 'lucide-react'
import useAuthStore from '../store/authStore'
import {listingsAPI} from '../services/api/listings'
import {useListingStore} from '../store/listingStore'
import {convertPrice, getCurrencySymbol} from '../utils/currency'
import Loading from '../components/common/Loading'
import {toast} from 'sonner'
import {useSavedListings} from '../hooks/useSavedListings'

export default function ListingDetail() {
  const {id} = useParams()
  const navigate = useNavigate()
  const {user} = useAuthStore()
  const {selectedCurrency} = useListingStore()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const {toggleSave, isListingSaved} = useSavedListings()
  const [bookmarkLoading, setBookmarkLoading] = useState(false)

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true)
      const {data, error} = await listingsAPI.getById(id)

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
      navigate('/login', {state: {from: `/listings/${id}`}})
      return
    }

    if (listing._supabase?.user_id === user.id) {
      toast.error("You can't message yourself")
      return
    }

    navigate(`/messages?userId=${listing._supabase.user_id}&listingId=${listing.id}`)
  }

  const handleBookmark = async () => {
    if (!user) {
      toast.error('Please login to save listings')
      navigate('/login', {state: {from: `/listings/${id}`}})
      return
    }

    setBookmarkLoading(true)
    const result = await toggleSave(listing.id)

    if (result.success) {
      toast.success(result.action === 'saved' ? 'Listing saved' : 'Listing removed from bookmarks')
    } else {
      toast.error('Failed to update bookmark')
    }
    setBookmarkLoading(false)
  }

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

  if (!listing) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <h1 className="text-2xl font-bold text-white mb-4">Listing not found</h1>
          <Link
            to="/listings"
            className="text-blue-400 hover:text-blue-300 transition-colors"
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
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="animate-fade-in-down">
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video group">
                <img
                  src={listing.images[currentImageIndex]}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Image Navigation */}
                {listing.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-md rounded-full px-3 py-2 border border-white/10">
                    {listing.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                          }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {listing.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2 p-4 bg-black/20">
                  {listing.images.slice(0, 5).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${index === currentImageIndex
                        ? 'border-blue-500 scale-105 shadow-lg shadow-blue-500/20'
                        : 'border-transparent hover:border-white/30 hover:scale-105'
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
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">{listing.title}</h1>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <p className="text-lg">{listing.location}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  {listing.postedTime}
                </span>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-white/10">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <Bed className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Bedrooms</p>
                    <p className="font-bold text-white">{listing.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <Bath className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Bathrooms</p>
                    <p className="font-bold text-white">{listing.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <Users className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Roommates</p>
                    <p className="font-bold text-white">
                      {Array.isArray(listing.roommates) && listing.roommates.length > 0
                        ? listing.roommates.length
                        : 'None'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <Home className="h-6 w-6 text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Type</p>
                    <p className="font-bold text-white">{listing.roomType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                Description
              </h2>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-lg">{listing.description}</p>
            </div>

            {/* Amenities */}
            {listing.amenities && listing.amenities.length > 0 && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <div className="w-1 h-8 bg-green-500 rounded-full"></div>
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {listing.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
                Availability
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <p className="text-sm text-gray-400 mb-2">Available From</p>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-purple-400" />
                    <p className="font-bold text-white text-lg">
                      {listing._supabase?.available_from
                        ? new Date(listing._supabase.available_from).toLocaleDateString()
                        : 'Not specified'}
                    </p>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <p className="text-sm text-gray-400 mb-2">Available To</p>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-purple-400" />
                    <p className="font-bold text-white text-lg">
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
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-24 space-y-6 shadow-2xl">
              {/* Price */}
              <div className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-5xl font-bold text-white tracking-tight">
                    {getCurrencySymbol(selectedCurrency)}{convertedPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-400 text-lg">/month</span>
                </div>
                {selectedCurrency !== 'USD' && (
                  <p className="text-sm text-gray-500">
                    Original: ${listing.price.toLocaleString()} USD
                  </p>
                )}
              </div>

              {/* Message Host Button */}
              {!isOwner ? (
                <div className="space-y-3">
                  <button
                    onClick={handleMessageHost}
                    className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-500 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 font-bold text-lg"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Message Host
                  </button>
                  <button
                    onClick={handleBookmark}
                    disabled={bookmarkLoading}
                    className={`w-full px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all border font-bold text-lg ${isListingSaved(listing.id)
                      ? 'border-blue-500/50 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20'
                      : 'border-white/10 text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/20'
                      }`}
                  >
                    <Bookmark className={`h-5 w-5 ${isListingSaved(listing.id) ? 'fill-blue-400' : ''}`} />
                    {bookmarkLoading ? 'Saving...' : (isListingSaved(listing.id) ? 'Saved' : 'Save Listing')}
                  </button>
                </div>
              ) : (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                  <p className="text-blue-400 font-bold">This is your listing</p>
                </div>
              )}

              {/* Host Info */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  Host Information
                </h3>
                <div className="flex items-center gap-4 mb-4 bg-white/5 p-4 rounded-xl border border-white/5">
                  <img
                    src={listing.host.avatar}
                    alt={listing.host.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/48'
                    }}
                  />
                  <div>
                    <p className="font-bold text-white text-lg">{listing.host.name}</p>
                    <p className="text-sm text-gray-400">Verified Host</p>
                  </div>
                </div>

                {/* Additional Host Details (if available from profiles) */}
                {listing._supabase && (
                  <div className="space-y-3 text-sm">
                    {listing._supabase.university && (
                      <div className="flex items-center gap-3 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                        <University className="h-4 w-4 text-blue-400" />
                        <span>{listing._supabase.university}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Pet Policy */}
              {listing.petPolicy && (
                <div className="border-t border-white/10 pt-6">
                  <h3 className="font-bold text-white mb-3">Pet Policy</h3>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-gray-300">
                    {listing.petPolicy}
                  </div>
                </div>
              )}

              {/* Views Count */}
              {listing._supabase?.views_count > 0 && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {listing._supabase.views_count} view{listing._supabase.views_count !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
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
      `}</style>
    </div>
  )
}