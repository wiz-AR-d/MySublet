import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Users, Bed, Bath } from 'lucide-react';

const ListingCard = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isPostedYesterday = listing.postedDate === '2024-11-18';

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200 rounded-2xl">
      {/* Image Section */}
      <div className="relative h-64 bg-gray-200 group">
        <img
          src={listing.images[currentImageIndex]}
          alt={listing.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop';
          }}
        />
        
        {/* Posted Badge */}
        {isPostedYesterday && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-gray-900/70 text-white px-3 py-1 text-xs backdrop-blur-sm">
              Posted yesterday
            </Badge>
          </div>
        )}

        {/* Host Avatar */}
        <div className="absolute bottom-3 left-3 flex flex-col items-center">
          <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
            <AvatarImage src={listing.host.avatar} alt={listing.host.name} />
            <AvatarFallback className="bg-purple-600 text-white">
              {listing.host.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-white font-medium mt-1 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
            {listing.host.name}
          </span>
        </div>

        {/* Image Navigation Dots */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
            {listing.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(index, e)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-6'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          {listing.title}
        </h3>
        
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-1">
          <span className="font-bold text-gray-900">${listing.price.toLocaleString()}/mo</span>
          <div className="flex items-center gap-3">
            {listing.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{listing.bedrooms}</span>
              </div>
            )}
            {listing.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{listing.bathrooms}</span>
              </div>
            )}
            {listing.roommates !== undefined && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{listing.roommates}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ListingCard;