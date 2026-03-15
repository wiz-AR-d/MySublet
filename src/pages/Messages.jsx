import {useState, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import useAuthStore from '../store/authStore'
import {useMessages} from '../hooks/useMessages'
import ConversationList from '../components/messages/ConversationList'
import MessageThread from '../components/messages/MessageThread'

export default function Messages() {
  const {user} = useAuthStore()
  const [searchParams, setSearchParams] = useSearchParams()

  // Get URL parameters (for deep linking)
  const urlUserId = searchParams.get('userId')
  const urlListingId = searchParams.get('listingId')

  // State for selected conversation
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [showConversations, setShowConversations] = useState(true)

  // Fetch conversations (pass null to get all)
  const {
    conversations,
    loading: conversationsLoading
  } = useMessages(null, null)

  // Auto-select conversation from URL or first conversation
  useEffect(() => {
    console.log('Messages page - URL params:', {urlUserId, urlListingId})
    console.log('Messages page - Conversations:', conversations)

    if (urlUserId && conversations) {
      const conversation = conversations.find(
        c => c.otherUser?.id === urlUserId
      )

      console.log('Found conversation:', conversation)

      if (conversation) {
        setSelectedConversation(conversation)
        setShowConversations(false) // Hide list on mobile
      } else {
        // No existing conversation - create a new one for display
        console.log('No existing conversation, creating new one')

        // Create a placeholder conversation for new chat
        const newConversation = {
          id: `new_conv_${urlUserId}_${urlListingId || 'general'}`,
          otherUser: {
            id: urlUserId,
            full_name: 'Loading...',
            avatar_url: null
          },
          listing: urlListingId ? {
            id: urlListingId,
            title: 'Loading...'
          } : null,
          lastMessage: null,
          unreadCount: 0,
          messages: []
        }

        setSelectedConversation(newConversation)
        setShowConversations(false)
      }
    } else if (!selectedConversation && conversations?.length > 0) {
      setSelectedConversation(conversations[0])
    }
  }, [urlUserId, urlListingId, conversations])

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation)
    setShowConversations(false) // Hide list on mobile

    // Update URL
    const params = {userId: conversation.otherUser.id}
    if (conversation.listing?.id) {
      params.listingId = conversation.listing.id
    }
    setSearchParams(params)
  }

  const handleBackToList = () => {
    setShowConversations(true)
    setSearchParams({}) // Clear URL params
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-6 animate-fade-in-down">
          Messages
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-stagger-in" style={{height: 'calc(100vh - 250px)'}}>
          {/* Left Panel: Conversations */}
          <div className={`lg:col-span-1 min-h-0 ${showConversations ? 'block' : 'hidden lg:block'}`}>
            <ConversationList
              conversations={conversations}
              selectedConversation={selectedConversation}
              onSelectConversation={handleSelectConversation}
              loading={conversationsLoading}
            />
          </div>

          {/* Right Panel: Message Thread */}
          <div className={`lg:col-span-2 min-h-0 ${!showConversations ? 'block' : 'hidden lg:block'}`}>
            {selectedConversation ? (
              <MessageThread
                conversation={selectedConversation}
                onBack={handleBackToList}
              />
            ) : (
              <div className="bg-neutral-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-800 h-full flex items-center justify-center hover:border-neutral-700 transition-all duration-500">
                <div className="text-center text-neutral-400 animate-float">
                  <svg className="w-20 h-20 mx-auto mb-4 text-neutral-600 animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-lg font-medium text-neutral-200 mb-2">Select a conversation to start messaging</p>
                  <p className="text-sm text-neutral-500">Choose a conversation from the list</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-slow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-in-down {
          from { 
            opacity: 0; 
            transform: translateY(-10px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        @keyframes stagger-in {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 20s ease infinite;
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        .animate-stagger-in {
          animation: stagger-in 1s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}