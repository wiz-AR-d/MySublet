import {useState, useEffect} from 'react'
import useAuthStore from '../../store/authStore'
import {useMessages} from '../../hooks/useMessages'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import {ArrowLeft, MapPin} from 'lucide-react'
import {toast} from 'sonner'
import {supabase} from '../../lib/supabase'
import {listingsAPI} from '../../services/api/listings'

export default function MessageThread({conversation, onBack}) {
  const {user} = useAuthStore()
  const [sending, setSending] = useState(false)
  const [enrichedConversation, setEnrichedConversation] = useState(conversation)

  // Fetch messages for this specific conversation
  const {
    messages,
    loading,
    sendMessage: sendMessageAPI
  } = useMessages(
    conversation.otherUser?.id,
    conversation.listing?.id
  )

  // Enrich conversation data if it's a new conversation
  useEffect(() => {
    const enrichData = async () => {
      // If otherUser name is "Loading...", fetch real data
      if (conversation.otherUser?.full_name === 'Loading...') {
        try {
          // Fetch user profile
          const {data: profile} = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url, email')
            .eq('id', conversation.otherUser.id)
            .single()

          let listingData = null

          // Fetch listing if available
          if (conversation.listing?.id) {
            const {data} = await listingsAPI.getById(conversation.listing.id)
            listingData = data
          }

          setEnrichedConversation({
            ...conversation,
            otherUser: profile || conversation.otherUser,
            listing: listingData || conversation.listing
          })
        } catch (error) {
          console.error('Error enriching conversation:', error)
        }
      } else {
        setEnrichedConversation(conversation)
      }
    }

    enrichData()
  }, [conversation])

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || !enrichedConversation.otherUser?.id) return

    setSending(true)
    try {
      const {error} = await sendMessageAPI(
        enrichedConversation.otherUser.id,
        messageText.trim(),
        enrichedConversation.listing?.id || null
      )

      if (error) {
        toast.error('Failed to send message')
        console.error('Send error:', error)
      } else {
        toast.success('Message sent!')
      }
    } catch (error) {
      toast.error('An error occurred')
      console.error('Send error:', error)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-neutral-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-800 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 bg-black">
        <div className="flex items-center gap-3">
          {/* Back button (mobile only) */}
          <button
            onClick={onBack}
            className="lg:hidden p-2 hover:bg-neutral-800/50 rounded-xl transition-all duration-300 hover:scale-110"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="h-5 w-5 text-neutral-400" />
          </button>

          <div className="relative group">
            <img
              src={enrichedConversation.otherUser?.avatar_url || 'https://via.placeholder.com/40'}
              alt={enrichedConversation.otherUser?.full_name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-neutral-700 transition-all duration-300 group-hover:ring-neutral-500"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/40'
              }}
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black shadow-lg shadow-green-500/50 animate-pulse-glow"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-neutral-200 truncate">
              {enrichedConversation.otherUser?.full_name || 'Unknown User'}
            </h2>
            {enrichedConversation.listing && enrichedConversation.listing.title !== 'Loading...' && (
              <div className="flex items-center gap-1 text-sm text-neutral-400">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{enrichedConversation.listing.title}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-black">
        <MessageList
          messages={messages}
          currentUserId={user?.id}
          loading={loading}
        />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-neutral-800 bg-black">
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={sending || loading}
        />
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
          }
          50% { 
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}