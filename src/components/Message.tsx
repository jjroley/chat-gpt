import Image from "next/image"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import CodeBlock from "./CodeBlock";
import { CodeComponent } from "react-markdown/lib/ast-to-react";
import Loader from "./Loader";

export interface MessageType {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function Message({ role, content, timestamp }:MessageType) {
  const bg = role === 'assistant' ? 'bg-slate-500' : 'bg-slate-600'
  const imageURL = role === 'assistant' ? '/chat-gpt-logo.jpeg' : '/profile.png'
  const displayName = role === 'assistant' ? 'ChatGPT' : "Jonathan Roley"

  return (
    <div className={`p-3 ${bg} border-b border-slate-400`}>
      <div className='flex items-center gap-3 mb-3'>
        <Image
          src={imageURL}
          width={30}
          height={30}
          className='aspect-square rounded-full'
          alt='...'
        />
        <p>{ displayName }</p>
      </div>
      {
        content.trim() ?
        <ReactMarkdown components={{ code: CodeBlock as CodeComponent }}>
          { content }
        </ReactMarkdown> :
        <div className='p-3'>
          <Loader variant="dots" />
        </div>
      }
    </div>
  )
}