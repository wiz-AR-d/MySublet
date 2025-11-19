import React from 'react';
import ListingCard from './ListingCard';

const ListingGrid = ({ listings }) => {
  return (
    <div className="h-full overflow-y-auto px-6 py-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{listings.length} listings</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6 pb-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default ListingGrid;