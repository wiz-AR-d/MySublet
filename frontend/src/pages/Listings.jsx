import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import ListingGrid from '../components/listings/ListingGrid';
import MapView from '../components/common/MapView';
import Pagination from '../components/common/Pagination';
import { generateMoreListings } from '../data/mockListings';

const Listings = () => {
  const [allListings] = useState(generateMoreListings());
  const [filteredListings, setFilteredListings] = useState(allListings);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Apply filters
  useEffect(() => {
    console.log('Applying filters:', filters);
    let filtered = [...allListings];

    // Price filter
    if (filters.minPrice && filters.minPrice !== '') {
      const minPrice = parseInt(filters.minPrice);
      filtered = filtered.filter(l => l.price >= minPrice);
      console.log(`After min price filter (${minPrice}):`, filtered.length);
    }
    if (filters.maxPrice && filters.maxPrice !== '') {
      const maxPrice = parseInt(filters.maxPrice);
      filtered = filtered.filter(l => l.price <= maxPrice);
      console.log(`After max price filter (${maxPrice}):`, filtered.length);
    }

    // Bedrooms filter
    if (filters.bedrooms && filters.bedrooms !== 'Any') {
      const beds = parseInt(filters.bedrooms);
      filtered = filtered.filter(l => l.bedrooms === beds);
      console.log(`After bedrooms filter (${beds}):`, filtered.length);
    }

    // Place type filter
    if (filters.placeType && filters.placeType !== 'Any type') {
      filtered = filtered.filter(l => l.placeType === filters.placeType);
      console.log(`After place type filter (${filters.placeType}):`, filtered.length);
    }

    // Amenities filter - listing must have at least one of the selected amenities
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(l => 
        filters.amenities.some(amenity => l.amenities.includes(amenity))
      );
      console.log(`After amenities filter:`, filtered.length);
    }

    // Roommate gender filter
    if (filters.roommateGender && filters.roommateGender.length > 0) {
      filtered = filtered.filter(l => 
        filters.roommateGender.includes(l.roommateGender)
      );
      console.log(`After roommate gender filter:`, filtered.length);
    }

    // Max roommates filter
    if (filters.maxRoommates && filters.maxRoommates !== 'Any') {
      const maxRoommates = parseInt(filters.maxRoommates);
      filtered = filtered.filter(l => l.roommates <= maxRoommates);
      console.log(`After max roommates filter (${maxRoommates}):`, filtered.length);
    }

    // Pets filter
    if (filters.pets && filters.pets !== 'All') {
      filtered = filtered.filter(l => l.pets === filters.pets);
      console.log(`After pets filter (${filters.pets}):`, filtered.length);
    }

    console.log('Final filtered count:', filtered.length);
    setFilteredListings(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, allListings]);

  const handleSearch = (searchParams) => {
    console.log('Search params:', searchParams);
    // TODO: Implement search functionality
  };

  const handleFilterChange = (newFilters) => {
    console.log('Filters changed:', newFilters);
    setFilters(newFilters);
  };

  // Pagination
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, endIndex);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header onSearch={handleSearch} onFilterChange={handleFilterChange} />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Listings Grid - Left Side */}
        <div className="w-[40%] bg-white border-r border-gray-200 flex flex-col">
          <ListingGrid 
            listings={currentListings} 
            totalListings={filteredListings.length}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredListings.length}
          />
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