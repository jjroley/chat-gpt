import { MessageType } from '@/components/Message'
import useLocalStorage from '@/hooks/useLocalStorage'
import { auth, db } from '@/lib/firebase'
import { GoogleAuthProvider, User, UserCredential, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { DocumentData, DocumentSnapshot, SnapshotOptions, collection, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, createContext, ReactNode } from 'react' 


interface ChatType {
  settings: string;
  messages: MessageType[];
  loadChat: (id:string) => void;
  sendMessage: (message:MessageType) => void;
  updateChatSettings: (key:string, value:any) => void;
  clearChat: () => void;
}


const ChatContext = createContext<ChatType | undefined>(undefined)

export function useChat() {
  const context = useContext(ChatContext)

  if(context === undefined) {
    throw new Error("useChat must be used inside of ChatProvider")
  }

  return context
}

interface CustomSettings {
  temperature: number;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
}

const defaultSettings:CustomSettings = {
  temperature: 0.9,
  max_tokens: 150,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0.6
}


export default function ChatProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage('CHAT_SETTINGS', defaultSettings)
  const [messages, setMessages] = useState<MessageType[]>([])

  const updateChatSettings = (key:string, value:number) => {
    setSettings((settings:CustomSettings) => {
      return { ...settings, [key]: value }
    })
  }

  const loadChat = (id:string) => {
    setMessages([])
  }

  const clearChat = () => {
    setMessages([])
  }

  const sendMessage = (message:MessageType) => {
    setMessages(messages => [...messages, message])
  }

  const value:ChatType = {
    settings: settings,
    messages: messages,
    updateChatSettings,
    sendMessage,
    loadChat,
    clearChat
  }
 
  return (
    <ChatContext.Provider value={value}>
      { children }
    </ChatContext.Provider>
  )
}