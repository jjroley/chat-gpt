import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"
import { useState } from "react"
import { IoLogoGoogle } from "react-icons/io5"
import { useRouter } from "next/router"

export default function Login() {
  const router = useRouter()
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState('')


  const handleGoogleSignIn = () => {
    signInWithGoogle()
    .then(() => {
      router.push('/')
    })
    .catch(err => {
      setError(err.message)
    })
  }

  return (
    <main className={`bg-slate-800 text-white min-h-screen flex items-center justify-center`}>
      <div className='bg-slate-600 max-w-xs flex flex-col p-5 rounded-lg'>
        <h1 className='text-3xl mb-3'>Log In</h1>
        <p>Create an account with Google to begin using this application</p>
        <Image
         src='/chat-gpt-logo.jpeg'
         width={150}
         height={150}
         alt="Chat GPT logo"
         className='max-w-[100%] w-full my-3 rounded-lg'
        />
        {
          error &&
          <div className='p-3 bg-orange-400'>{ error }</div>
        }
        <button onClick={handleGoogleSignIn} className='bg-teal-600 p-3 rounded-md flex gap-2 justify-center'><IoLogoGoogle className='text-2xl' /> Login with Google</button>
      </div>
    </main>
  )
}