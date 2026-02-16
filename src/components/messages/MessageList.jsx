import { useEffect, useRef } from 'react'
import { format, formatDistanceToNow, isSameDay } from 'date-fns'

export default function MessageList({ messages, currentUserId, loading }) {
  const messagesEndRef = useRef(null)
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  if (loading && (!messages || messages.length === 0)) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p>Loading messages...</p>
      </div>
    )
  }
  
  if (!messages || messages.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <p className="text-lg font-medium">No messages yet</p>
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
    <div className="p-4 space-y-4">
      {groupedMessages.map((item, index) => {
        if (item.type === 'date') {
          return (
            <div key={`date-${item.date.toISOString()}`} className="text-center">
              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
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
            className={`flex gap-3 ${isSent ? 'justify-end' : 'justify-start'}`}
          >
            {/* Avatar for received messages */}
            {!isSent && (
              <img
                src={message.sender?.avatar || 'https://via.placeholder.com/32'}
                alt={message.sender?.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/32'
                }}
              />
            )}
            
            {/* Message Bubble */}
            <div className={`max-w-[70%] ${isSent ? 'items-end' : 'items-start'}`}>
              {!isSent && (
                <p className="text-xs text-gray-600 mb-1 px-1">
                  {message.sender?.name}
                </p>
              )}
              
              <div
                className={`rounded-lg px-4 py-2 ${
                  isSent
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.message}
                </p>
                <p className={`text-xs mt-1 ${
                  isSent ? 'text-blue-100' : 'text-gray-500'
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
      <div ref={messagesEndRef} />
    </div>
  )
}