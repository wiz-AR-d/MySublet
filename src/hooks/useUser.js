// User profile hook
export function useUser() {
  return {
    user: null,
    loading: false,
    error: null,
    updateProfile: () => {},
  };
}

