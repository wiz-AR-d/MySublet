import { useState } from 'react';
import { useListingStore } from '../store/listingStore';
import SearchBar from '../components/listings/SearchBar';
import FilterModal from '../components/listings/FilterModal';
import ListingGrid from '../components/listings/ListingGrid';
import ListingMap from '../components/listings/ListingMap';
import Pagination from '../components/common/Pagination';
import CurrencySelector from '../components/listings/CurrencySelector';
import { Filter, MapPin } from 'lucide-react';

export default function Listings() {
  const {
    filteredListings,
    currentPage,
    itemsPerPage,
    showFilters,
    toggleFilters,
    selectedCurrency
  } = useListingStore();
  
  const [viewMode, setViewMode] = useState('split'); // 'list', 'map', 'split'
  
  // Calculate pagination
  const totalItems = filteredListings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, endIndex);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <SearchBar />
          
          {/* Controls */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleFilters}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                data-testid="filter-toggle-btn"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{totalItems}</span> listings
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Currency Selector */}
              <CurrencySelector />
              
              {/* View Mode Toggle */}
              <div className="hidden lg:flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  data-testid="list-view-btn"
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'split'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  data-testid="split-view-btn"
                >
                  Split
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'map'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  data-testid="map-view-btn"
                >
                  Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter Modal */}
      <FilterModal isOpen={showFilters} onClose={toggleFilters} />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`flex gap-8 ${
          viewMode === 'list' ? 'flex-col' : 
          viewMode === 'map' ? 'flex-col lg:flex-row-reverse' :
          'flex-col lg:flex-row'
        }`}>
          
          {/* Listings Grid */}
          <div className={`${
            viewMode === 'split' ? 'lg:w-3/5' : 
            viewMode === 'map' ? 'lg:w-2/5' : 
            'w-full'
          }`}>
            <ListingGrid 
              listings={currentListings} 
              viewMode={viewMode}
            />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={useListingStore.getState().setCurrentPage}
                />
              </div>
            )}
          </div>
          
          {/* Map */}
          {(viewMode === 'split' || viewMode === 'map') && (
            <div className={`${
              viewMode === 'split' ? 'lg:w-2/5' : 
              viewMode === 'map' ? 'lg:w-3/5' : 
              'w-full'
            } ${viewMode === 'map' ? 'order-first lg:order-last' : ''}`}>
              <div className="sticky top-32">
                <ListingMap 
                  listings={currentListings}
                  selectedCurrency={selectedCurrency}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}