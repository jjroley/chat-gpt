import { useState, useEffect } from "react";



export default function useLocalStorage(key:string, initialValue:any) {
  const prefixedKey = "CHAT_GPT_" + key

  const [data, setData] = useState(() => {
    if(typeof window === 'undefined') return

    const data = localStorage.getItem(prefixedKey)

    if(data) {
      try {
        const parsed = JSON.parse(data)
        return parsed
      }
      catch {
        return data
      }
    }
    
    return initialValue
  })
  

  useEffect(() => {
    localStorage.setItem(prefixedKey, typeof data === 'string' ? data : JSON.stringify(data))
  }, [data])

  return [data, setData]
}