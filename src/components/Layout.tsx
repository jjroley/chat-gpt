import Header from "./Header"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className={`bg-slate-800 text-white`}>
      <div className='container mx-auto bg-slate-600 h-screen max-w-3xl flex flex-col'>
        <Header />
        { children }
      </div>
    </main>
  )
}