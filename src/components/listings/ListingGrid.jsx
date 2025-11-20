import ListingCard from './ListingCard';
import { EmptyState } from '../common/EmptyState';

export default function ListingGrid({ listings, viewMode = 'split' }) {
  if (!listings || listings.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <EmptyState
          title="No listings found"
          description="Try adjusting your filters or search criteria to find more listings."
        />
      </div>
    );
  }
  
  return (
    <div 
      className={`grid gap-6 ${
        viewMode === 'list' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : viewMode === 'map' 
          ? 'grid-cols-1 sm:grid-cols-2'
          : 'grid-cols-1 sm:grid-cols-2'
      }`}
      data-testid="listing-grid"
    >
      {listings.map((listing) => (
        <div key={listing.id} data-testid={`listing-${listing.id}`}>
          <ListingCard listing={listing} />
        </div>
      ))}
    </div>
  );
}