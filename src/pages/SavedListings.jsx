// src/pages/SavedListings.jsx
import {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import {Bookmark, Home, AlertCircle, Trash2, Eye, MapPin, DollarSign, Bed, Bath} from 'lucide-react'
import {useSavedListings} from '../hooks/useSavedListings'
import {toast} from 'sonner'

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

export default function SavedListings() {
  const {savedListings, loading, toggleSave, isListingSaved} = useSavedListings()

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in-down">
          <h1 className="text-4xl font-bold text-white flex items-center gap-4 mb-3 tracking-tight">
            <div className="bg-blue-500/20 p-3 rounded-2xl backdrop-blur-sm border border-blue-500/30">
              <Bookmark className="h-8 w-8 text-blue-400" />
            </div>
            Saved Listings
          </h1>
          <p className="text-gray-400 text-lg ml-1">
            {savedListings.length} {savedListings.length === 1 ? 'listing' : 'listings'} saved for later
          </p>
        </div>

        {/* Listings Grid */}
        {savedListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedListings.map((listing, index) => (
              <ScrollReveal key={listing.id} delay={index * 100}>
                <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={listing.images?.[0] || 'https://via.placeholder.com/400x300'}
                      alt={listing.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Bookmark indicator */}
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md border border-white/10 p-2.5 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                      <Bookmark className="h-5 w-5 text-blue-400 fill-blue-400" />
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="font-bold text-white">
                        ${formatPrice(listing.price || listing.monthly_rent)}/mo
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
                        <span className="line-clamp-1">{listing.location || listing.city}</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                          <Bed className="h-4 w-4 text-gray-400" />
                          <span>{listing.bedrooms || listing.total_rooms} bed</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                          <Bath className="h-4 w-4 text-gray-400" />
                          <span>{listing.bathrooms} bath</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      <Link
                        to={`/listings/${listing.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20 text-sm font-bold"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>

                      <button
                        onClick={() => handleRemove(listing.id)}
                        className="px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors text-sm group/delete"
                        title="Remove from saved"
                      >
                        <Trash2 className="h-4 w-4 group-hover/delete:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-16 text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Bookmark className="h-10 w-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              No saved listings yet
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start bookmarking listings you're interested in to view them here. They'll be safe and sound!
            </p>
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 shadow-lg shadow-white/10"
            >
              <Home className="h-5 w-5" />
              Browse Listings
            </Link>
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
      `}</style>
    </div>
  )
}
