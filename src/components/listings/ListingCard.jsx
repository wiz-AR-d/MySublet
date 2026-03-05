import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useListingStore} from '../../store/listingStore';
import {convertPrice, getCurrencySymbol} from '../../utils/currency';
import {ChevronLeft, ChevronRight, Bookmark, Bed, Bath, Users, MapPin} from 'lucide-react';
import {useSavedListings} from '../../hooks/useSavedListings';
import useAuthStore from '../../store/authStore';
import {toast} from 'sonner';

export default function ListingCard({listing}) {
  const {selectedCurrency} = useListingStore();
  const {user} = useAuthStore();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {toggleSave, isListingSaved} = useSavedListings();
  const [bookmarkLoading, setBookmarkLoading] = useState(false);


  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(index);
  };


  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    if (!user) {
      toast.error('Please login to save listings');
      navigate('/login');
      return;
    }

    // Check if it's user's own listing
    if (listing._supabase?.user_id === user.id) {
      toast.error("You can't bookmark your own listing");
      return;
    }

    setBookmarkLoading(true);
    const result = await toggleSave(listing.id);

    if (result.success) {
      toast.success(result.action === 'saved' ? 'Listing saved' : 'Removed from bookmarks');
    } else {
      toast.error('Failed to update bookmark');
    }
    setBookmarkLoading(false);
  };

  return (
    <Link to={`/listings/${listing.id}`} className="block h-full">
      <div className="group relative bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 h-full flex flex-col">

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-700 pointer-events-none" />

        {/* Image Carousel */}
        <div className="relative aspect-[4/3] overflow-hidden m-2 rounded-2xl">
          <img
            src={listing.images[currentImageIndex]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Image Navigation */}
          {listing.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                data-testid="prev-image-btn"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                data-testid="next-image-btn"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </>
          )}

          {/* Image Dots */}
          {listing.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full border border-white/5">
              {listing.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => goToImage(index, e)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentImageIndex
                    ? 'bg-white w-3'
                    : 'bg-white/50 hover:bg-white/80'
                    }`}
                  data-testid={`image-dot-${index}`}
                />
              ))}
            </div>
          )}

          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            disabled={bookmarkLoading}
            className="absolute top-3 right-3 w-9 h-9 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 group/bookmark"
            data-testid="bookmark-btn"
          >
            <Bookmark
              className={`w-4 h-4 transition-colors duration-300 ${isListingSaved(listing.id) ? 'text-blue-400 fill-blue-400' : 'text-white group-hover/bookmark:text-blue-400'
                }`}
            />
          </button>

          {/* Posted Time Badge */}
          <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
            {listing.postedTime}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col relative z-10">
          {/* Title */}
          <h3 className="font-bold text-white text-lg mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
            {listing.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-4">
            <MapPin className="w-3.5 h-3.5 text-gray-500" />
            <span className="line-clamp-1">{listing.location}</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1.5 mb-5">
            <span className="text-2xl font-bold text-white tracking-tight">
              {getCurrencySymbol(selectedCurrency)}{Math.round(convertPrice(listing.price, 'USD', selectedCurrency)).toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm font-medium">{listing.duration}</span>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-300 mb-5 mt-auto">
            <div className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1.5 rounded-lg border border-white/5">
              <Bed className="w-3.5 h-3.5 text-gray-500" />
              <span>{listing.bedrooms} bed</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1.5 rounded-lg border border-white/5">
              <Bath className="w-3.5 h-3.5 text-gray-500" />
              <span>{listing.bathrooms} bath</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1.5 rounded-lg border border-white/5">
              <Users className="w-3.5 h-3.5 text-gray-500" />
              <span>
                {Array.isArray(listing.roommates) && listing.roommates.length > 0
                  ? listing.roommates.length
                  : '0'}
              </span>
            </div>
          </div>

          {/* Host */}
          <div className="flex items-center gap-2.5 pt-4 border-t border-white/5">
            <img
              src={listing.host.avatar}
              alt={listing.host.name}
              className="w-7 h-7 rounded-full object-cover border border-white/10"
            />
            <span className="text-sm text-gray-400 font-medium group-hover:text-white transition-colors">
              {listing.host.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}