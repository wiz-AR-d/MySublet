import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import ListingGrid from '../components/listings/ListingGrid';
import MapView from '../components/common/MapView';
import { generateMoreListings } from '../data/mockListings';

const Listings = () => {
  const [allListings] = useState(generateMoreListings());
  const [filteredListings, setFilteredListings] = useState(allListings);
  const [filters, setFilters] = useState({});

  // Apply filters
  useEffect(() => {
    let filtered = [...allListings];

    // Price filter
    if (filters.minPrice) {
      filtered = filtered.filter(l => l.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(l => l.price <= parseInt(filters.maxPrice));
    }

    // Bedrooms filter
    if (filters.bedrooms && filters.bedrooms !== 'Any') {
      filtered = filtered.filter(l => l.bedrooms === parseInt(filters.bedrooms));
    }

    // Place type filter
    if (filters.placeType && filters.placeType !== 'Any type') {
      filtered = filtered.filter(l => l.placeType === filters.placeType);
    }

    // Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(l => 
        filters.amenities.some(amenity => l.amenities.includes(amenity))
      );
    }

    // Roommate gender filter
    if (filters.roommateGender && filters.roommateGender.length > 0) {
      filtered = filtered.filter(l => 
        filters.roommateGender.includes(l.roommateGender)
      );
    }

    // Max roommates filter
    if (filters.maxRoommates && filters.maxRoommates !== 'Any') {
      filtered = filtered.filter(l => l.roommates <= parseInt(filters.maxRoommates));
    }

    // Pets filter
    if (filters.pets && filters.pets !== 'All') {
      filtered = filtered.filter(l => l.pets === filters.pets);
    }

    setFilteredListings(filtered);
  }, [filters, allListings]);

  const handleSearch = (searchParams) => {
    console.log('Search params:', searchParams);
    // TODO: Implement search functionality
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header onSearch={handleSearch} onFilterChange={handleFilterChange} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Listings Grid - Left Side */}
        <div className="w-[40%] bg-white border-r border-gray-200">
          <ListingGrid listings={filteredListings.slice(0, 6)} />
        </div>

        {/* Map - Right Side */}
        <div className="w-[60%]">
          <MapView 
            listings={filteredListings} 
            center={{ lat: 40.7580, lng: -73.9855 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Listings;