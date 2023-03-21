import { useState, useEffect } from "react";



export default function useLocalStorage(key:string, initialValue:any) {
  const prefixedKey = "CHAT_GPT_" + key

  const [data, setData] = useState(initialValue)
  
  
  useEffect(() => {
    const data = localStorage.getItem(prefixedKey)

    console.log("Local storage set", data)
    if(data) {
      try {
        const parsed = JSON.parse(data)
        console.log('setting data', key)
        setData(parsed)
      }
      catch {
        console.log('setting data', key)
        setData(data)
      }
    }
  }, [])


  useEffect(() => {
    localStorage.setItem(prefixedKey, typeof data === 'string' ? data : JSON.stringify(data))
  }, [data])

  return [data, setData]
}