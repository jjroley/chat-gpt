import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Lato } from '@next/font/google'

const lato = Lato({
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  subsets: ['latin']
})

import AuthProvider from '@/contexts/AuthContext'
import ChatProvider from '@/contexts/ChatContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${lato.variable} font-sans`}>
      <AuthProvider>
        <ChatProvider>
          <Component {...pageProps} />
        </ChatProvider>
      </AuthProvider>
    </div>
  )
}
