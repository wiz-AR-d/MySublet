import { useState } from 'react'
import useAuthStore from '../../store/authStore'
import { useMessages } from '../../hooks/useMessages'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { ArrowLeft, MapPin } from 'lucide-react'
import { toast } from 'sonner'

export default function MessageThread({ conversation, onBack }) {
  const { user } = useAuthStore()
  const [sending, setSending] = useState(false)
  
  // Fetch messages for this specific conversation
  const { 
    messages, 
    loading, 
    sendMessage: sendMessageAPI 
  } = useMessages(
    conversation.otherUser?.id, 
    conversation.listing?.id
  )
  
  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || !conversation.otherUser?.id) return
    
    setSending(true)
    try {
      const { error } = await sendMessageAPI(
        conversation.otherUser.id,
        messageText.trim(),
        conversation.listing?.id || null
      )
      
      if (error) {
        toast.error('Failed to send message')
        console.error('Send error:', error)
      }
    } catch (error) {
      toast.error('An error occurred')
      console.error('Send error:', error)
    } finally {
      setSending(false)
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Back button (mobile only) */}
          <button
            onClick={onBack}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <img
            src={conversation.otherUser?.avatar_url || 'https://via.placeholder.com/40'}
            alt={conversation.otherUser?.full_name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/40'
            }}
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {conversation.otherUser?.full_name || 'Unknown User'}
            </h2>
            {conversation.listing && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{conversation.listing.title}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <MessageList 
          messages={messages} 
          currentUserId={user?.id} 
          loading={loading} 
        />
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          disabled={sending || loading}
        />
      </div>
    </div>
  )
}