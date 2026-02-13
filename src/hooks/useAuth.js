// Authentication hook
import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

export function useAuth() {
  const {
    user,
    profile,
    session,
    loading,
    signIn,
    signOut,
    signUp,
    signInWithGoogle,
    initialize,
    updateProfile,
    hasRole,
    isSublessor,
    isSublessee
  } = useAuthStore();

  useEffect(() => {
    if (!loading && !user) {
      initialize();
    }
  }, []);

  return {
    user,
    profile,
    session,
    loading,
    signIn,
    signOut,
    signUp,
    signInWithGoogle,
    updateProfile,
    hasRole,
    isSublessor,
    isSublessee,
    isAuthenticated: !!user
  };
}

