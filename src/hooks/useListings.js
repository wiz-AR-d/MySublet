// Listings data hook
import { useState, useEffect, useCallback } from 'react';
import { listingsAPI } from '../services/api/listings';

export function useListings(filters = {}) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await listingsAPI.getAll(filters);
      
      if (fetchError) {
        setError(fetchError);
        setListings([]);
      } else {
        setListings(data || []);
      }
    } catch (err) {
      setError(err);
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return {
    listings,
    loading,
    error,
    fetchListings,
    refetch: fetchListings
  };
}

