import Head from 'next/head'
import Layout from '@/components/Layout'
import Conversation from '@/components/Conversation'


export default function Home() {
  return (
    <>
      <Head>
        <title>Chat with ChatGPT</title>
      </Head>
      <Layout>
        <Conversation />
      </Layout>
    </>
  )
}
