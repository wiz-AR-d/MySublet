// Messages hook
import { useState, useEffect, useCallback } from 'react';
import { messagesAPI } from '../services/api/messages';

export function useMessages(otherUserId = null, listingId = null) {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch conversations list
  const fetchConversations = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await messagesAPI.getConversations();
      
      if (fetchError) {
        setError(fetchError);
        setConversations([]);
      } else {
        setConversations(data || []);
      }
    } catch (err) {
      setError(err);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch messages for a specific conversation
  const fetchMessages = useCallback(async () => {
    if (!otherUserId) {
      setMessages([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await messagesAPI.getMessages(otherUserId, listingId);
      
      if (fetchError) {
        setError(fetchError);
        setMessages([]);
      } else {
        setMessages(data || []);
      }
    } catch (err) {
      setError(err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [otherUserId, listingId]);

  useEffect(() => {
    if (otherUserId) {
      fetchMessages();
    } else {
      fetchConversations();
    }
  }, [otherUserId, listingId, fetchMessages, fetchConversations]);

  const sendMessage = useCallback(async (receiverId, messageText, listingId = null) => {
    setError(null);
    
    try {
      const { data, error: sendError } = await messagesAPI.sendMessage(receiverId, messageText, listingId);
      
      if (sendError) {
        setError(sendError);
        return { data: null, error: sendError };
      }
      
      // Add message to current messages list
      if (data) {
        setMessages(prev => [...prev, data]);
      }
      
      // Refresh conversations if we're viewing the list
      if (!otherUserId) {
        await fetchConversations();
      }
      
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    }
  }, [otherUserId, fetchConversations]);

  return {
    messages,
    conversations,
    loading,
    error,
    sendMessage,
    fetchMessages,
    fetchConversations,
    refetch: otherUserId ? fetchMessages : fetchConversations
  };
}

