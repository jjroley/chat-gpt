import React, { useMemo } from "react"
import hljs from 'highlight.js'
import "highlight.js/styles/atom-one-dark.css"
import { IoClipboardOutline } from "react-icons/io5"

type CodeBlockProps = {
  inline: boolean;
  children: React.ReactNode[]
}

export default function CodeBlock({ inline, children }:CodeBlockProps) {
  const initialCode = children[0] as string

  const highlightedCode = useMemo<string>(() => {
    return inline ? '' : hljs.highlightAuto(initialCode).value
  }, [initialCode])

  if(inline) {
    return <code>{ children }</code>
  }

  return (
    <div className='bg-black my-2 text-sm'>
      <div className='font-sans p-2 bg-slate-700 flex gap-1 justify-end items-center cursor-pointer'><IoClipboardOutline />Copy</div>
      <div className='code p-2 overflow-x-auto whitespace-pre-wrap'>
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }}></code>
      </div>
    </div>
  )
}