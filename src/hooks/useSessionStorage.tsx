import { useState, useEffect } from "react";

export default function useSessionStorage(key:string, initialValue:any) {
  const prefixedKey = "CHAT_GPT_" + key

  const [data, setData] = useState(initialValue)
  
  
  useEffect(() => {
    const data = sessionStorage.getItem(prefixedKey)

    if(data) {
      try {
        const parsed = JSON.parse(data)
        setData(parsed)
      }
      catch {
        setData(data)
      }
    }
  }, [])


  useEffect(() => {
    sessionStorage.setItem(prefixedKey, typeof data === 'string' ? data : JSON.stringify(data))
  }, [data])

  return [data, setData]
}