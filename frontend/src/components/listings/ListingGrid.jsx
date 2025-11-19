import React from 'react';
import ListingCard from './ListingCard';

const ListingGrid = ({ listings, totalListings }) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {totalListings || listings.length} listing{(totalListings || listings.length) !== 1 ? 's' : ''}
        </h2>
      </div>
      
      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-semibold text-gray-900 mb-2">No listings found</p>
          <p className="text-sm text-gray-600">Try adjusting your filters to see more results</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 pb-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingGrid;