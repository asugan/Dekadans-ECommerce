import { createFileRoute } from '@tanstack/react-router'
import { TRPCProvider } from '@/integrations/trpc/react'
import { HomeContent } from '@/components/HomeContent'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <TRPCProvider>
      <HomeContent />
    </TRPCProvider>
  )
}
