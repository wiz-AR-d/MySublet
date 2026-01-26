// Listings data hook
export function useListings() {
  return {
    listings: [],
    loading: false,
    error: null,
    fetchListings: () => {},
  };
}

