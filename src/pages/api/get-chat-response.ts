// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'

type Data = {
  messages?: Object[];
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(req.method !== "POST") {
    return res.status(404).end()
  }

  const { messages } = req.body


  if(!Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid data" })
  }

  const config = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    stream: true,
    max_tokens: 256
  }

  const fetchOptions:AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    responseType: "stream"
  }


  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    config,
    fetchOptions
  )

  response.data.pipe(res)
}
