import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useListingStore } from '../../store/listingStore';
import { convertPrice, getCurrencySymbol } from '../../utils/currency';
import { ChevronLeft, ChevronRight, Bookmark, Bed, Bath, Users } from 'lucide-react';
import { useSavedListings } from '../../hooks/useSavedListings';
import useAuthStore from '../../store/authStore';
import { toast } from 'sonner';

export default function ListingCard({ listing }) {
  const { selectedCurrency } = useListingStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toggleSave, isListingSaved } = useSavedListings();
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
    <Link to={`/listings/${listing.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer group">
        {/* Image Carousel */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={listing.images[currentImageIndex]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Image Navigation */}
          {listing.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                data-testid="prev-image-btn"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                data-testid="next-image-btn"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            </>
          )}
          
          {/* Image Dots */}
          {listing.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
              {listing.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => goToImage(index, e)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'bg-white'
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
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
            className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center shadow-md transition-all duration-200 disabled:opacity-50"
            data-testid="bookmark-btn"
          >
            <Bookmark 
              className={`w-4 h-4 transition-colors duration-200 ${
                isListingSaved(listing.id) ? 'text-blue-600 fill-current' : 'text-gray-700'
              }`} 
            />
          </button>
          
          {/* Posted Time Badge */}
          <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-lg">
            {listing.postedTime}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
            {listing.title}
          </h3>
          
          {/* Location */}
          <p className="text-gray-600 text-sm mb-3">
            {listing.location}
          </p>
          
          {/* Price */}
          <div className="flex items-baseline space-x-1 mb-3">
            <span className="text-2xl font-bold text-gray-900">
              {getCurrencySymbol(selectedCurrency)}{Math.round(convertPrice(listing.price, 'USD', selectedCurrency)).toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm">{listing.duration}</span>
          </div>
          
          {/* Property Details */}
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4" />
              <span>{listing.bedrooms} bed</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4" />
              <span>{listing.bathrooms} bath</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>
                {Array.isArray(listing.roommates) && listing.roommates.length > 0
                  ? `${listing.roommates.length} roommate${listing.roommates.length !== 1 ? 's' : ''}`
                  : '0 roommates'}
              </span>
            </div>
          </div>
          
          {/* Host */}
          <div className="flex items-center space-x-2">
            <img
              src={listing.host.avatar}
              alt={listing.host.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700 font-medium">
              {listing.host.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}