// Messages API calls
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { transformMessage } from '../../utils/dataTransformers';

export const messagesAPI = {
  /**
   * Get all conversations for current user
   */
  getConversations: async () => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Get unique conversations
      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          ),
          receiver:profiles!messages_receiver_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          ),
          listings (
            id,
            title,
            images
          )
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group messages by conversation (other user)
      const conversationsMap = new Map();

      (messages || []).forEach(msg => {
        const otherUserId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
        const otherUser = msg.sender_id === user.id ? msg.receiver : msg.sender;
        
        if (!conversationsMap.has(otherUserId)) {
          conversationsMap.set(otherUserId, {
            id: `conv_${otherUserId}_${msg.listing_id || 'general'}`,
            otherUser: otherUser,
            listing: msg.listings,
            lastMessage: transformMessage(msg, msg.sender, msg.receiver),
            unreadCount: 0,
            messages: []
          });
        }

        const conversation = conversationsMap.get(otherUserId);
        conversation.messages.push(transformMessage(msg, msg.sender, msg.receiver));
        
        if (!msg.read && msg.receiver_id === user.id) {
          conversation.unreadCount++;
        }
      });

      const conversations = Array.from(conversationsMap.values());
      
      // Sort by last message time
      conversations.sort((a, b) => {
        const aTime = new Date(a.lastMessage.created_at);
        const bTime = new Date(b.lastMessage.created_at);
        return bTime - aTime;
      });

      return { data: conversations, error: null };
    } catch (error) {
      console.error('Error fetching conversations:', error);
      return { data: null, error };
    }
  },

  /**
   * Get messages for a specific conversation
   */
  getMessages: async (otherUserId, listingId = null) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      let query = supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          ),
          receiver:profiles!messages_receiver_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (listingId) {
        query = query.eq('listing_id', listingId);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('receiver_id', user.id)
        .eq('sender_id', otherUserId)
        .eq('read', false);

      const transformedMessages = (data || []).map(msg => 
        transformMessage(msg, msg.sender, msg.receiver)
      );

      return { data: transformedMessages, error: null };
    } catch (error) {
      console.error('Error fetching messages:', error);
      return { data: null, error };
    }
  },

  /**
   * Send a message
   */
  sendMessage: async (receiverId, messageText, listingId = null) => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase is not configured');
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const messageData = {
        sender_id: user.id,
        receiver_id: receiverId,
        message: messageText,
        listing_id: listingId,
        read: false
      };

      const { data, error } = await supabase
        .from('messages')
        .insert(messageData)
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          ),
          receiver:profiles!messages_receiver_id_fkey (
            id,
            full_name,
            avatar_url,
            email
          )
        `)
        .single();

      if (error) throw error;

      const transformedMessage = transformMessage(data, data.sender, data.receiver);

      return { data: transformedMessage, error: null };
    } catch (error) {
      console.error('Error sending message:', error);
      return { data: null, error };
    }
  }
};

