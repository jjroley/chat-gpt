import { useState, useEffect, useRef } from 'react'
import Input from "./Input"
import StreamingMessage from "./StreamingMessage"
import Message from "./Message"
import { Protected } from '@/contexts/AuthContext'
import { useChat } from '@/contexts/ChatContext'


export default function Conversation() {
  const { messages, sendMessage } = useChat()
  const [isStreaming, setIsStreaming] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
     behavior: 'smooth',
     block: 'nearest'
    })
   }, [messages])

  return (
    <Protected>
      <div className='overflow-y-auto flex-grow'>
        {
          messages.map((message, index) => (
            <Message key={index} { ...message } />
          ))
        }
        {
          isStreaming && 
          <StreamingMessage
            messages={messages} 
            onComplete={(message) => {
              sendMessage(message)
              setIsStreaming(false)
            }}
            onUpdate={() => {
              scrollRef.current?.scrollIntoView({ block: 'nearest' })
            }}
          />
        }
        <div ref={scrollRef}></div>
      </div>
      <Input 
        onSubmit={result => {
          sendMessage({ role: 'user', content: result, timestamp: '' })
          setIsStreaming(true)
        }}
        useable={!isStreaming}
      />
    </Protected>
  )
}