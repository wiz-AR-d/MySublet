import {formatDistanceToNow} from 'date-fns'

export default function ConversationList({
  conversations,
  selectedConversation,
  onSelectConversation,
  loading
}) {
  if (loading) {
    return (
      <div className="bg-neutral-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-800 p-6 text-center h-full animate-pulse-gentle">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-400 mx-auto"></div>
        <p className="text-neutral-400 mt-2">Loading conversations...</p>
      </div>
    )
  }

  if (!conversations || conversations.length === 0) {
    return (
      <div className="bg-neutral-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-800 p-6 text-center h-full">
        <svg className="w-16 h-16 mx-auto mb-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-neutral-300 font-medium">No conversations yet</p>
        <p className="text-sm text-neutral-500 mt-2">
          Start a conversation from a listing
        </p>
      </div>
    )
  }

  return (
    <div className="bg-neutral-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-800 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800 bg-black">
        <h2 className="text-lg font-semibold text-neutral-100">
          Conversations ({conversations.length})
        </h2>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation, index) => {
          const isSelected = selectedConversation?.id === conversation.id

          return (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`p-4 border-b border-neutral-800 cursor-pointer transition-all duration-500 hover:bg-neutral-800 hover:shadow-lg animate-slide-in-stagger ${isSelected ? 'bg-neutral-800 border-l-4 border-l-neutral-500 shadow-lg' : ''
                }`}
              style={{animationDelay: `${index * 0.05}s`}}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative group">
                  <img
                    src={conversation.otherUser?.avatar_url || 'https://via.placeholder.com/40'}
                    alt={conversation.otherUser?.full_name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-neutral-700 transition-all duration-300 group-hover:ring-neutral-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/40'
                    }}
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black shadow-lg shadow-green-500/50"></div>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Name and Time */}
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-neutral-200 truncate transition-colors duration-300 hover:text-white">
                      {conversation.otherUser?.full_name || 'Unknown User'}
                    </h3>
                    {conversation.lastMessage?.created_at && (
                      <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">
                        {formatDistanceToNow(new Date(conversation.lastMessage.created_at), {
                          addSuffix: true
                        })}
                      </span>
                    )}
                  </div>

                  {/* Listing Context */}
                  {conversation.listing && (
                    <p className="text-xs text-neutral-400 truncate mb-1 flex items-center gap-1">
                      <span>📍</span> {conversation.listing.title}
                    </p>
                  )}

                  {/* Last Message */}
                  <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'text-neutral-200 font-medium' : 'text-neutral-500'
                    } `}>
                    {conversation.lastMessage?.message || 'No messages yet'}
                  </p>
                </div>

                {/* Unread Badge */}
                {conversation.unreadCount > 0 && (
                  <span className="bg-neutral-500 text-black text-xs font-bold px-2 py-1 rounded-full min-w-[24px] text-center flex-shrink-0 animate-bounce-subtle shadow-lg">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
@keyframes pulse - gentle {
  0 %, 100 % {opacity: 1;}
  50 % {opacity: 0.8;}
}
@keyframes slide -in -stagger {
          from {
    opacity: 0;
    transform: translateX(-20px);
  }
          to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes bounce - subtle {
  0 %, 100 % {transform: scale(1);}
  50 % {transform: scale(1.1);}
}
        .animate - pulse - gentle {
  animation: pulse - gentle 2s ease -in -out infinite;
}
        .animate - slide -in -stagger {
  animation: slide -in -stagger 0.5s ease - out backwards;
}
        .animate - bounce - subtle {
  animation: bounce - subtle 2s ease -in -out infinite;
}
`}</style>
    </div>
  )
}