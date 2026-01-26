// Listings state (Zustand)
import { create } from 'zustand';

export const useListingStore = create((set) => ({
  listings: [],
  setListings: (listings) => set({ listings }),
  addListing: (listing) => set((state) => ({ listings: [...state.listings, listing] })),
  updateListing: (id, updates) => set((state) => ({
    listings: state.listings.map((l) => (l.id === id ? { ...l, ...updates } : l)),
  })),
  removeListing: (id) => set((state) => ({
    listings: state.listings.filter((l) => l.id !== id),
  })),
}));

