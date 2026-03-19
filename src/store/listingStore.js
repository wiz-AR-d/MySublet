// Listings state (Zustand)
import { create } from 'zustand';
import { listingsAPI } from '../services/api/listings';
import { isSupabaseConfigured } from '../lib/supabase';

export const useListingStore = create((set, get) => ({
  // Listings data
  allListings: [],
  filteredListings: [],
  loading: false,
  error: null,

  // Pagination
  currentPage: 1,
  itemsPerPage: 15,

  // Currency
  selectedCurrency: 'USD',

  // Filters
  filters: {
    city: '',
    moveInDate: null,
    moveOutDate: null,
    priceRange: ['', ''], // Blank initial values
    bedrooms: '', // Blank instead of 'Any'
    roomType: '', // Blank instead of 'Any type'
    amenities: [],
    roommateGender: '', // Blank instead of 'Any'
    maxRoommates: '', // Blank instead of 'Any'
    petPolicy: '' // Blank instead of 'All'
  },

  // Filter visibility
  showFilters: false,

  // Actions
  fetchListings: async (filters = {}) => {
    if (!isSupabaseConfigured) {
      console.warn('Supabase is not configured. Using empty listings.');
      set({ allListings: [], filteredListings: [], loading: false });
      return;
    }

    set({ loading: true, error: null });

    try {
      const { data, error } = await listingsAPI.getAll(filters);

      if (error) {
        set({ loading: false, error, allListings: [], filteredListings: [] });
        return;
      }

      const listings = data || [];
      const currentFilters = get().filters;
      const filtered = get().applyFilters(listings, currentFilters);

      set({
        allListings: listings,
        filteredListings: filtered,
        loading: false,
        error: null
      });
    } catch (err) {
      console.error('Error fetching listings:', err);
      set({
        loading: false,
        error: err,
        allListings: [],
        filteredListings: []
      });
    }
  },

  setListings: (listings) => {
    const currentFilters = get().filters;
    const filtered = get().applyFilters(listings, currentFilters);
    set({ allListings: listings, filteredListings: filtered });
  },

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

    // Optionally refetch from server with new filters
    // get().fetchListings(updatedFilters);
  },

  clearFilters: () => {
    const defaultFilters = {
      city: '',
      moveInDate: null,
      moveOutDate: null,
      priceRange: ['', ''],
      bedrooms: '',
      roomType: '',
      amenities: [],
      roommateGender: '',
      maxRoommates: '',
      petPolicy: ''
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
    if (!listings || listings.length === 0) return [];

    return listings.filter(listing => {
      // City filter directly from Supabase City column
      if (filters.city && listing.city) {
        if (listing.city.toLowerCase() !== filters.city.toLowerCase()) {
          return false;
        }
      }

      // Price filter
      if (listing.price !== undefined && listing.price !== null) {
        const minPrice = filters.priceRange[0] !== '' ? filters.priceRange[0] : 0;
        const maxPrice = filters.priceRange[1] !== '' ? filters.priceRange[1] : Infinity;

        if (listing.price < minPrice || listing.price > maxPrice) {
          return false;
        }
      }

      // Bedrooms filter
      if (filters.bedrooms && filters.bedrooms !== '') {
        const listingBedrooms = listing.bedrooms === 'SL' ? 0 : parseInt(listing.bedrooms);
        const filterBedrooms = parseInt(filters.bedrooms);
        if (listingBedrooms !== filterBedrooms) {
          return false;
        }
      }

      // Room type filter
      if (filters.roomType && filters.roomType !== '' && listing.roomType && listing.roomType !== filters.roomType) {
        return false;
      }

      // Amenities filter
      if (filters.amenities && filters.amenities.length > 0) {
        // If listing has no amenities but filter requires some, filter it out
        if (!listing.amenities || !Array.isArray(listing.amenities)) {
          return false;
        }

        const hasAllAmenities = filters.amenities.every(amenity =>
          listing.amenities.some(item => item.toLowerCase() === amenity.toLowerCase())
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      // Roommate gender filter
      if (filters.roommateGender && filters.roommateGender !== '' && listing.roommateGender && listing.roommateGender !== filters.roommateGender) {
        return false;
      }

      // Max roommates filter
      if (filters.maxRoommates && filters.maxRoommates !== '') {
        // Logic for max roommates can be complex depending on data structure
        // Assuming listing has a roommates count or similar
        // For now, simple equality check if data exists
        if (listing.roommatesCount !== undefined && listing.roommatesCount !== parseInt(filters.maxRoommates)) {
          // This logic depends on exact requirement (max vs exact), keeping simple for now
          // If "max roommates" means filtering places with AT MOST X roommates:
          // if (listing.roommatesCount > parseInt(filters.maxRoommates)) return false;
        }
      }

      // Pet policy filter
      if (filters.petPolicy && filters.petPolicy !== '') {
        if (filters.petPolicy === 'Pets allowed' && listing.petPolicy !== 'Pets allowed') {
          return false;
        }
        if (filters.petPolicy === 'Pets prohibited' && listing.petPolicy !== 'No pets') {
          return false;
        }
      }

      return true;
    });
  },

  // Search listings
  searchListings: async (query, filters = {}) => {
    if (!isSupabaseConfigured) {
      console.warn('Supabase is not configured. Cannot search listings.');
      return;
    }

    set({ loading: true, error: null });

    try {
      const searchFilters = {
        ...get().filters,
        ...filters
      };

      const { data, error } = await listingsAPI.search(query, searchFilters);

      if (error) {
        set({ loading: false, error, filteredListings: [] });
        return;
      }

      const listings = data || [];
      const filtered = get().applyFilters(listings, searchFilters);

      set({
        allListings: listings,
        filteredListings: filtered,
        loading: false,
        error: null,
        currentPage: 1
      });
    } catch (err) {
      console.error('Error searching listings:', err);
      set({
        loading: false,
        error: err,
        filteredListings: []
      });
    }
  }
}));

