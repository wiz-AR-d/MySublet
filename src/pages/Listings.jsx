// src/pages/Listings.jsx
import {useState, useEffect, useRef} from 'react';
import {useListingStore} from '../store/listingStore';
import SearchBar from '../components/listings/SearchBar';
import FilterModal from '../components/listings/FilterModal';
import ListingGrid from '../components/listings/ListingGrid';
import ListingMap from '../components/listings/ListingMap';
import Pagination from '../components/common/Pagination';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import {Filter, MapPin, List, LayoutGrid, Map as MapIcon} from 'lucide-react';

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

export default function Listings() {
  const {
    filteredListings,
    currentPage,
    itemsPerPage,
    showFilters,
    toggleFilters,
    selectedCurrency,
    loading,
    error,
    fetchListings
  } = useListingStore();

  // Fetch listings on mount
  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const [viewMode, setViewMode] = useState('split'); // 'list', 'map', 'split'

  // Calculate pagination
  const totalItems = filteredListings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, endIndex);

  if (loading && filteredListings.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin-reverse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && filteredListings.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ErrorMessage error={error} onRetry={fetchListings} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      {/* Header Section */}
      <div className="bg-neutral-900/60 backdrop-blur-2xl border-b border-white/5 sticky top-[65px] z-40 transition-all duration-300 shadow-2xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar Container */}
          <div className="py-2">
            <SearchBar />
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-3 gap-2">
            <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={toggleFilters}
                className="flex items-center space-x-2 px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.08] hover:border-white/20 transition-all hover:scale-105 text-gray-200 group"
                data-testid="filter-toggle-btn"
              >
                <Filter className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                <span className="font-medium">Filters</span>
              </button>

              <div className="text-sm text-gray-400">
                <span className="font-bold text-white">{totalItems}</span> listings
              </div>
            </div>

            <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
              {/* View Mode Toggle */}
              <div className="hidden lg:flex bg-black/40 rounded-xl p-1 border border-white/5 backdrop-blur-md">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${viewMode === 'list'
                    ? 'bg-white/10 text-white shadow-lg shadow-black/20'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  data-testid="list-view-btn"
                >
                  <List className="w-4 h-4" />
                  List
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${viewMode === 'split'
                    ? 'bg-white/10 text-white shadow-lg shadow-black/20'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  data-testid="split-view-btn"
                >
                  <LayoutGrid className="w-4 h-4" />
                  Split
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${viewMode === 'map'
                    ? 'bg-white/10 text-white shadow-lg shadow-black/20'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  data-testid="map-view-btn"
                >
                  <MapIcon className="w-4 h-4" />
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
        <div className={`flex gap-8 ${viewMode === 'list' ? 'flex-col' :
          viewMode === 'map' ? 'flex-col lg:flex-row-reverse' :
            'flex-col lg:flex-row'
          }`}>

          {/* Listings Grid */}
          <div className={`${viewMode === 'split' ? 'lg:w-3/5' :
            viewMode === 'map' ? 'lg:w-2/5' :
              'w-full'
            }`}>
            <ScrollReveal>
              <ListingGrid
                listings={currentListings}
                viewMode={viewMode}
              />
            </ScrollReveal>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
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
            <div className={`${viewMode === 'split' ? 'lg:w-2/5' :
              viewMode === 'map' ? 'lg:w-3/5' :
                'w-full'
              } ${viewMode === 'map' ? 'order-first lg:order-last' : ''}`}>
              <div className="sticky top-48 h-[calc(100vh-14rem)] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <ListingMap
                  listings={currentListings}
                  selectedCurrency={selectedCurrency}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
      `}</style>
    </div>
  );
}