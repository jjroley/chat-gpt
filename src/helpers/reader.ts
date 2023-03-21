import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser"


async function* asyncStream(stream:ReadableStream) {
  const reader = stream.getReader()
  try {
    while(true) {
      const { done, value } = await reader.read()
      if(done) return
      yield value
    }
  }
  finally {
    reader.releaseLock()
  }
}

interface FetchStreamOptions extends RequestInit {
  onMessage: (msg:any) => void
}

export async function streamFrom(url:string, { onMessage, ...fetchOptions }: FetchStreamOptions) {
  let res = await fetch(url, { ...fetchOptions })
  
  if(!(res.body instanceof ReadableStream)) {
    throw new Error("streamFrom can only accept readable streams") 
  }


  if(res.status !== 200) {
    let message = 'An unexpected error occured'
    if(res.status === 401) {
      message = "It looks like your API key is invalid. Make sure you have provided a valid API key"
    }
    throw new Error(message)
  }

  const parser = createParser((event: ParsedEvent | ReconnectInterval) => {
    if(event.type === 'event') {
      onMessage(event.data)
    }
  });

  (async () => {
    for await (const chunk of asyncStream(res.body as ReadableStream)) {
      const str = new TextDecoder().decode(chunk)
      parser.feed(str)
    }
  })()
}