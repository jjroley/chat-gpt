import dynamic from 'next/dynamic'

const ClientOnlySettings = dynamic(() => import('@/components/Settings'), {
  ssr: false
})

export default function Settings() {
  return <ClientOnlySettings />
}



