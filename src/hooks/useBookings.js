// Bookings data hook
export function useBookings() {
  return {
    bookings: [],
    loading: false,
    error: null,
    fetchBookings: () => {},
  };
}

