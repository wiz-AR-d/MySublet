// User profile hook
import { useState, useEffect, useCallback } from 'react';
import { usersAPI } from '../services/api/users';
import useAuthStore from '../store/authStore';

export function useUser(userId = null) {
  const { user: currentUser } = useAuthStore();
  const targetUserId = userId || currentUser?.id;
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    if (!targetUserId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await usersAPI.getProfile(targetUserId);
      
      if (fetchError) {
        setError(fetchError);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (err) {
      setError(err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [targetUserId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (updates) => {
    if (!targetUserId) {
      return { data: null, error: { message: 'No user ID provided' } };
    }

    setLoading(true);
    setError(null);
    
    try {
      const { data, error: updateError } = await usersAPI.updateProfile(targetUserId, updates);
      
      if (updateError) {
        setError(updateError);
        return { data: null, error: updateError };
      }
      
      setProfile(data);
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, [targetUserId]);

  const uploadAvatar = useCallback(async (file) => {
    if (!targetUserId) {
      return { data: null, error: { message: 'No user ID provided' } };
    }

    setLoading(true);
    setError(null);
    
    try {
      const { data, error: uploadError } = await usersAPI.uploadAvatar(targetUserId, file);
      
      if (uploadError) {
        setError(uploadError);
        return { data: null, error: uploadError };
      }
      
      setProfile(data);
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, [targetUserId]);

  return {
    profile,
    user: profile,
    loading,
    error,
    updateProfile,
    uploadAvatar,
    refetch: fetchProfile
  };
}

