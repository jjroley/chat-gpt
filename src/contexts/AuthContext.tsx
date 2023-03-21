import useLocalStorage from '@/hooks/useLocalStorage'
import { auth, db } from '@/lib/firebase'
import { GoogleAuthProvider, User, UserCredential, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { DocumentData, DocumentSnapshot, SnapshotOptions, collection, doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, createContext, ReactNode } from 'react' 

const AuthContext = createContext<AuthType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)

  if(context === undefined) {
    throw new Error("useAuth must be used inside of an AuthProvider")
  
  }
  return context
}

export function Protected({ children }: { children: ReactNode }) {
  const router = useRouter()
  const user = useAuth()

  useEffect(() => {
    if(!user) {
      router.push('/login')
    }
  }, [])

  if(!user) {
    return null
  }

  return <>{ children }</>
}



interface AuthType {
  user: User | null;
  meta: SnapshotOptions | null;
  apiKey: string;
  chatSettings: CustomSettings;
  updateApiKey: (newKey:string) => void; 
  signInWithGoogle: () => Promise<UserCredential>;
  updateChatSettings: (key:string, value:number) => void;
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


export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [meta, setMeta] = useState<DocumentData | null>(null)
  const [apiKey, setApiKey] = useLocalStorage('API_KEY', '')
  const [settings, setSettings] = useLocalStorage('CHAT_SETTINGS', defaultSettings)

  useEffect(() => {
    onAuthStateChanged(auth, (user:User | null) => {
      setUser(user ? { ...user } : null)
    })
  }, [])

  const signInWithGoogle = async () => {
    const GoogleProvider = new GoogleAuthProvider()
    return await signInWithPopup(auth, GoogleProvider)
  }

  const updateApiKey = (newKey:string) => {
    setApiKey(newKey)
  }

  const updateChatSettings = (key:string, value:number) => {
    setSettings((settings:CustomSettings) => {
      return { ...settings, [key]: value }
    })
  }

  const value:AuthType = {
    user: user,
    meta: meta,
    apiKey: apiKey,
    chatSettings: settings,
    updateApiKey: updateApiKey,
    signInWithGoogle: signInWithGoogle,
    updateChatSettings
  }
 
  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}