import { formatDistanceToNow } from 'date-fns'

export default function ConversationList({ 
  conversations, 
  selectedConversation,
  onSelectConversation,
  loading 
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-2">Loading conversations...</p>
      </div>
    )
  }
  
  if (!conversations || conversations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center h-full">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-gray-600 font-medium">No conversations yet</p>
        <p className="text-sm text-gray-500 mt-2">
          Start a conversation from a listing
        </p>
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Conversations ({conversations.length})
        </h2>
      </div>
      
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => {
          const isSelected = selectedConversation?.id === conversation.id
          
          return (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                isSelected ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <img
                  src={conversation.otherUser?.avatar_url || 'https://via.placeholder.com/40'}
                  alt={conversation.otherUser?.full_name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/40'
                  }}
                />
                
                <div className="flex-1 min-w-0">
                  {/* Name and Time */}
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.otherUser?.full_name || 'Unknown User'}
                    </h3>
                    {conversation.lastMessage?.created_at && (
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {formatDistanceToNow(new Date(conversation.lastMessage.created_at), { 
                          addSuffix: true 
                        })}
                      </span>
                    )}
                  </div>
                  
                  {/* Listing Context */}
                  {conversation.listing && (
                    <p className="text-xs text-gray-600 truncate mb-1">
                      📍 {conversation.listing.title}
                    </p>
                  )}
                  
                  {/* Last Message */}
                  <p className={`text-sm truncate ${
                    conversation.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                  }`}>
                    {conversation.lastMessage?.message || 'No messages yet'}
                  </p>
                </div>
                
                {/* Unread Badge */}
                {conversation.unreadCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full min-w-[24px] text-center flex-shrink-0">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}