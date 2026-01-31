// Listings state (Zustand)
import { create } from 'zustand';
import { mockListings } from '../data/mockListings';

export const useListingStore = create((set, get) => ({
  // Listings data
  allListings: mockListings,
  filteredListings: mockListings,
  
  // Pagination
  currentPage: 1,
  itemsPerPage: 15,
  
  // Currency
  selectedCurrency: 'USD',
  
  // Filters
  filters: {
    location: '',
    moveInDate: null,
    moveOutDate: null,
    priceRange: [0, 10000],
    bedrooms: 'Any',
    roomType: 'Any type',
    amenities: [],
    roommateGender: 'Any',
    maxRoommates: 'Any',
    petPolicy: 'All'
  },
  
  // Filter visibility
  showFilters: false,
  
  // Actions
  setListings: (listings) => set({ allListings: listings, filteredListings: listings }),
  
  addListing: (listing) => set((state) => ({ 
    allListings: [...state.allListings, listing],
    filteredListings: [...state.filteredListings, listing]
  })),
  
  updateListing: (id, updates) => set((state) => ({
    allListings: state.allListings.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    filteredListings: state.filteredListings.map((l) => (l.id === id ? { ...l, ...updates } : l)),
  })),
  
  removeListing: (id) => set((state) => ({
    allListings: state.allListings.filter((l) => l.id !== id),
    filteredListings: state.filteredListings.filter((l) => l.id !== id),
  })),
  
  // Currency actions
  setCurrency: (currency) => set({ selectedCurrency: currency }),
  
  // Filter actions
  setFilters: (newFilters) => {
    set((state) => {
      const updatedFilters = { ...state.filters, ...newFilters };
      const filtered = get().applyFilters(state.allListings, updatedFilters);
      
      return {
        filters: updatedFilters,
        filteredListings: filtered,
        currentPage: 1 // Reset to first page when filters change
      };
    });
  },
  
  clearFilters: () => {
    const defaultFilters = {
      location: '',
      moveInDate: null,
      moveOutDate: null,
      priceRange: [0, 10000],
      bedrooms: 'Any',
      roomType: 'Any type',
      amenities: [],
      roommateGender: 'Any',
      maxRoommates: 'Any',
      petPolicy: 'All'
    };
    
    set((state) => ({
      filters: defaultFilters,
      filteredListings: state.allListings,
      currentPage: 1
    }));
  },
  
  toggleFilters: () => set((state) => ({ showFilters: !state.showFilters })),
  
  // Pagination actions
  setCurrentPage: (page) => set({ currentPage: page }),
  
  // Helper function to apply filters
  applyFilters: (listings, filters) => {
    return listings.filter(listing => {
      // Location filter
      if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Price filter
      if (listing.price < filters.priceRange[0] || listing.price > filters.priceRange[1]) {
        return false;
      }
      
      // Bedrooms filter
      if (filters.bedrooms !== 'Any') {
        const listingBedrooms = listing.bedrooms === 'SL' ? 0 : parseInt(listing.bedrooms);
        const filterBedrooms = parseInt(filters.bedrooms);
        if (listingBedrooms !== filterBedrooms) {
          return false;
        }
      }
      
      // Room type filter
      if (filters.roomType !== 'Any type' && listing.roomType !== filters.roomType) {
        return false;
      }
      
      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          listing.amenities.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }
      
      // Pet policy filter
      if (filters.petPolicy !== 'All') {
        if (filters.petPolicy === 'Pets allowed' && listing.petPolicy !== 'Pets allowed') {
          return false;
        }
        if (filters.petPolicy === 'Pets prohibited' && listing.petPolicy !== 'No pets') {
          return false;
        }
      }
      
      return true;
    });
  }
}));

