// src/hooks/useSavedListings.js
import { useState, useEffect } from 'react'
import { savedListingsAPI } from '../services/api/savedListings'
import useAuthStore from '../store/authStore'

export function useSavedListings() {
  const { user } = useAuthStore()
  const [savedListings, setSavedListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSavedListings = async () => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error } = await savedListingsAPI.getUserSavedListings(user.id)
    
    if (error) {
      setError(error)
    } else {
      setSavedListings(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSavedListings()
  }, [user?.id])

  const toggleSave = async (listingId) => {
    if (!user?.id) return { success: false, error: 'Not authenticated' }

    const isSaved = savedListings.some(l => l.id === listingId)

    if (isSaved) {
      const { error } = await savedListingsAPI.removeSavedListing(user.id, listingId)
      if (!error) {
        setSavedListings(prev => prev.filter(l => l.id !== listingId))
        return { success: true, action: 'removed' }
      }
      return { success: false, error }
    } else {
      const { error } = await savedListingsAPI.saveListing(user.id, listingId)
      if (!error) {
        await fetchSavedListings() // Refresh to get full listing data
        return { success: true, action: 'saved' }
      }
      return { success: false, error }
    }
  }

  const isListingSaved = (listingId) => {
    return savedListings.some(l => l.id === listingId)
  }

  return {
    savedListings,
    loading,
    error,
    toggleSave,
    isListingSaved,
    refetch: fetchSavedListings
  }
}
