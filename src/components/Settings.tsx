import Head from 'next/head'
import Layout from '@/components/Layout'
import { IoInformationCircleOutline, IoTrashOutline } from 'react-icons/io5'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import Range from '@/components/Range'
import { debounce } from 'lodash'

export default function Settings() {
  const { apiKey, chatSettings, updateApiKey, updateChatSettings } = useAuth()
  const [key, setKey] = useState(apiKey)
  const [saved, setSaved] = useState(false)
  const [temperature, setTemperature] = useState(chatSettings.temperature)
  const [maxTokens, setMaxTokens] = useState(chatSettings.max_tokens)
  const [topP, setTopP] = useState(chatSettings.top_p)
  const [frequenyPenalty, setFrequencyPenalty] = useState(chatSettings.frequency_penalty)
  const [presencePenalty, setPresencePenalty] = useState(chatSettings.presence_penalty)

  const handleKeySave = () => {
    updateApiKey(key)
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
    }, 1000)
  }

  const handleKeyDelete = () => {
    updateApiKey('')
    setKey('')
  }

  const handleChange = (key:string, value:number) => {
    updateChatSettings(key, value)
  }

  const debounceUpdate = useMemo(() => {
    return debounce( handleChange, 200 )
  }, [])

  useEffect(() => debounceUpdate.cancel, [])

  useEffect(() => {
    debounceUpdate('temperature', temperature)
  }, [temperature])

  useEffect(() => {
    debounceUpdate('max_tokens', maxTokens)
  }, [maxTokens])

  useEffect(() => {
    debounceUpdate('top_p', topP)
  }, [topP])

  useEffect(() => {
    debounceUpdate('frequeny_penalty', frequenyPenalty)
  }, [frequenyPenalty])

  useEffect(() => {
    debounceUpdate('presence_penalty', presencePenalty)
  }, [presencePenalty])

  useEffect(() => {
    setKey(apiKey)
  }, [apiKey])

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Layout>
        <div className='p-3 w-full max-w-md mx-auto pt-6'>
          <h1 className='text-2xl mb-5'>Settings</h1>
          <h2 className='text-lg'>API key</h2>
          <p className='text-sm text-slate-300 font-thin'>Enter an API key from OpenAI in order to use this application</p>
          <div className='p-2 bg-yellow-600 text-sm font-thin rounded-md my-1 flex items-center gap-2'>
            <IoInformationCircleOutline className='text-xl' />
            Your API key is saved in your browser. It will not be logged or collected
          </div>
          <div className='flex items-center gap-2'>
            <input 
              className='bg-inherit border border-slate-500 px-3 py-2 rounded-md w-full'
              placeholder='sk-If05...'
              value={key}
              onChange={e => setKey(e.target.value)}
            />
            <button onClick={handleKeySave} className='bg-teal-600 p-2 rounded-md'>{ saved ? "Saved!" : "Save" }</button>
            <button onClick={handleKeyDelete} className='bg-red-600 p-2 rounded-md text-2xl'><IoTrashOutline /></button>
          </div>
          <h2 className='text-lg mt-8'>Configuration</h2>
          <p className='text-sm text-slate-300 font-thin mb-3'>Customize the responses from OpenAI with these configurations</p>
          
          
          <Range label="Temperature" info="Hello, wolrd" className='accent-teal-600 w-3/5 mt' min={0} max={2} step={0.01} value={temperature} onChange={e => setTemperature(parseFloat(e.target.value))} name="temperature" />
          <Range label="Maximum Length" info="Hello, wolrd" className='accent-teal-600 w-3/5' min={1} max={4000} step={1} value={maxTokens} onChange={e => setMaxTokens(parseFloat(e.target.value))} name="max_tokens" />
          <Range label="Top P" info="Hello, wolrd" className='accent-teal-600 w-3/5' min={0} max={1} step={0.01} value={topP} onChange={e => setTopP(parseFloat(e.target.value))} name="top_p" />
          <Range label="Frequency Penalty" info="Hello, wolrd" className='accent-teal-600 w-3/5' min={0} max={2} step={0.01} value={frequenyPenalty} onChange={e => setFrequencyPenalty(parseFloat(e.target.value))} name="frequency_penalty" />
          <Range label="Presence Penalty" info="Hello, wolrd" className='accent-teal-600 w-3/5' min={0} max={2} step={0.01} value={presencePenalty} onChange={e => setPresencePenalty(parseFloat(e.target.value))} name="presence_penalty" />

        </div>
      </Layout>
    </>
  )
}
