import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

export default function MessageInput({ onSendMessage, disabled = false }) {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const textareaRef = useRef(null)
  
  // Auto-focus input on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [message])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!message.trim() || sending || disabled) return
    
    setSending(true)
    try {
      await onSendMessage(message.trim())
      setMessage('')
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
      textareaRef.current?.focus()
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message... (Press Enter to send, Shift+Enter for new line)"
        disabled={disabled || sending}
        rows={1}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ 
          maxHeight: '120px', 
          minHeight: '42px',
          overflow: 'auto'
        }}
      />
      <button
        type="submit"
        disabled={!message.trim() || sending || disabled}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
      >
        {sending ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span className="hidden sm:inline">Send</span>
          </>
        )}
      </button>
    </form>
  )
}