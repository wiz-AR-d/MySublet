// Messages hook
export function useMessages() {
  return {
    messages: [],
    loading: false,
    error: null,
    sendMessage: () => {},
  };
}

