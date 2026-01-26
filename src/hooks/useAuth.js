// Authentication hook
export function useAuth() {
  return {
    user: null,
    loading: false,
    signIn: () => {},
    signOut: () => {},
    signUp: () => {},
  };
}

