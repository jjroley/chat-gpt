import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { IoSend } from 'react-icons/io5'

export default function Input({ onSubmit, useable }: { onSubmit: (result:string) => void, useable: boolean }) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if(!inputRef.current) return
    inputRef.current.style.height = '0'
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
  }, [value])

  const handleSubmit = () => {
    if(!value.trim() || !useable) return
    onSubmit(value)
    setValue('')
  }

  const handleKeyDown = (e:KeyboardEvent) => {
    if(e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className='flex-grow-0 p-2 bg-slate-700 flex gap-2 items-end'>
      <textarea 
        value={value}
        ref={inputRef}
        placeholder="Type a message..."
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className='w-full resize-none rounded-md bg-slate-600 h-auto p-2 max-h-[150px] outline-none border-teal-600'
      />
      <button
        className='bg-teal-600 disabled:cursor-not-allowed cursor-pointer hover:bg-teal-500 disabled:bg-teal-800 disabled:text-slate-400 p-2 px-3 rounded-md' 
        onClick={handleSubmit}
        disabled={!useable}>
          <IoSend style={{ height: '23px' }} />
      </button>
    </div>
  )
}