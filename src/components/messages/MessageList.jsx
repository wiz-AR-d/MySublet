import {useEffect, useRef} from 'react'
import {format, formatDistanceToNow, isSameDay} from 'date-fns'

export default function MessageList({messages, currentUserId, loading}) {
  const messagesEndRef = useRef(null)
  const containerRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    // We use a small timeout to ensure the DOM has updated and painted the new message
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }
    }, 50)
  }, [messages])

  if (loading && (!messages || messages.length === 0)) {
    return (
      <div className="p-8 text-center text-neutral-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-400 mx-auto mb-2"></div>
        <p>Loading messages...</p>
      </div>
    )
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="p-8 text-center text-neutral-400">
        <svg className="w-16 h-16 mx-auto mb-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <p className="text-lg font-medium text-neutral-300">No messages yet</p>
        <p className="text-sm mt-2">Start the conversation!</p>
      </div>
    )
  }

  // Group messages by date
  const groupedMessages = []
  let lastDate = null

  messages.forEach((message) => {
    const messageDate = new Date(message.created_at)

    if (!lastDate || !isSameDay(lastDate, messageDate)) {
      groupedMessages.push({
        type: 'date',
        date: messageDate
      })
      lastDate = messageDate
    }

    groupedMessages.push({
      type: 'message',
      data: message
    })
  })

  return (
    <div ref={containerRef} className="p-4 space-y-4 h-full overflow-y-auto">
      {groupedMessages.map((item, index) => {
        if (item.type === 'date') {
          return (
            <div key={`date-${item.date.toISOString()}`} className="text-center animate-fade-in-smooth">
              <span className="inline-block bg-neutral-800 text-neutral-400 text-xs px-3 py-1 rounded-full border border-neutral-700">
                {format(item.date, 'MMMM d, yyyy')}
              </span>
            </div>
          )
        }

        const message = item.data
        const isSent = message.sender_id === currentUserId

        return (
          <div
            key={message.id}
            className={`flex gap-3 ${isSent ? 'justify-end' : 'justify-start'} animate-message-slide`}
            style={{animationDelay: `${index * 0.02}s`}}
          >
            {/* Avatar for received messages */}
            {!isSent && (
              <img
                src={message.sender?.avatar || 'https://via.placeholder.com/32'}
                alt={message.sender?.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-2 ring-neutral-700/50"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/32'
                }}
              />
            )}

            {/* Message Bubble */}
            <div className={`max-w-[70%] ${isSent ? 'items-end' : 'items-start'}`}>
              {!isSent && (
                <p className="text-xs text-neutral-500 mb-1 px-1">
                  {message.sender?.name}
                </p>
              )}

              <div
                className={`rounded-2xl px-4 py-2 transition-all duration-300 hover:scale-[1.02] ${isSent
                  ? 'bg-neutral-700 text-white rounded-br-none shadow-lg hover:bg-neutral-600'
                  : 'bg-neutral-800 text-neutral-100 rounded-bl-none border border-neutral-700 hover:bg-neutral-750'
                  }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.message}
                </p>
                <p className={`text-xs mt-1 ${isSent ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                  {formatDistanceToNow(new Date(message.created_at), {
                    addSuffix: true
                  })}
                </p>
              </div>
            </div>
          </div>
        )
      })}

      {/* Auto-scroll anchor */}
      <div ref={messagesEndRef} className="h-1 w-full" />

      <style jsx>{`
        @keyframes fade-in-smooth {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes message-slide {
          from { 
            opacity: 0; 
            transform: translateY(15px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        .animate-fade-in-smooth {
          animation: fade-in-smooth 0.5s ease-out;
        }
        .animate-message-slide {
          animation: message-slide 0.4s ease-out backwards;
        }
      `}</style>
    </div>
  )
}