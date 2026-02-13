// Bookings data hook
import { useState, useEffect, useCallback } from 'react';
import { bookingsAPI } from '../services/api/bookings';

export function useBookings(userId = null) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await bookingsAPI.getAll(userId);
      
      if (fetchError) {
        setError(fetchError);
        setBookings([]);
      } else {
        setBookings(data || []);
      }
    } catch (err) {
      setError(err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const createBooking = useCallback(async (bookingData) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: createError } = await bookingsAPI.create(bookingData);
      
      if (createError) {
        setError(createError);
        return { data: null, error: createError };
      }
      
      // Refresh bookings list
      await fetchBookings();
      
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, [fetchBookings]);

  const updateBooking = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: updateError } = await bookingsAPI.update(id, updates);
      
      if (updateError) {
        setError(updateError);
        return { data: null, error: updateError };
      }
      
      // Refresh bookings list
      await fetchBookings();
      
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, [fetchBookings]);

  const cancelBooking = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: cancelError } = await bookingsAPI.cancel(id);
      
      if (cancelError) {
        setError(cancelError);
        return { data: null, error: cancelError };
      }
      
      // Refresh bookings list
      await fetchBookings();
      
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    updateBooking,
    cancelBooking,
    refetch: fetchBookings
  };
}

