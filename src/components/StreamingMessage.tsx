import { useEffect, useState, useCallback, useRef } from "react";
import Message, { MessageType } from "./Message";
import { streamFrom } from "@/helpers/reader";
import { getFormattedMessages } from "@/helpers";
import { useAuth } from "@/contexts/AuthContext";

export default function StreamingMessage(
  { 
    messages, 
    onComplete,
    onUpdate
  }: 
  { 
    messages: MessageType[]
    onComplete: (message:MessageType) => void
    onUpdate: (content:string) => void
  }
) {
  const [content, setContent] = useState('')
  const contentRef = useRef('')
  const [error, setError] = useState('')
  const { apiKey, chatSettings } = useAuth()

  useEffect(() => {
    streamFrom('https://api.openai.com/v1/chat/completions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        ...chatSettings,
        messages: getFormattedMessages(messages.slice(-5, messages.length)),
        stream: true
      }),
      onMessage: (data) => {
        if(data === '[DONE]') {
          onComplete({ role: 'assistant', content: contentRef.current, timestamp: '' })
          return;
        }
        try {
          const response = JSON.parse(data)

          const delta = response.choices[0].delta

          if(delta?.content) {
            setContent(content => content + delta.content)
            onUpdate(contentRef.current)
          }
        }
        catch(err) {
          setError("Unexpected error occured")
        }
      }
    })
    .catch(err => {
      setError(err.message)
      console.error(err)
    })
  }, []) 


  useEffect(() => {
    contentRef.current = content
  }, [content])

  return (
    <div className={error ? 'text-red-500' : ''}>
      <Message 
        role='assistant'
        content={error || content}
        timestamp=''
      />
    </div>
  )
}