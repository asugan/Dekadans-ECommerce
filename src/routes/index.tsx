import { createFileRoute } from '@tanstack/react-router'
import { TRPCProvider } from '@/integrations/trpc/react'
import { HomeContent } from '@/components/HomeContent'

export const Route = createFileRoute('/')({
  loader: async ({ context: { trpc, queryClient } }) => {
    // Pre-fetch data on the server side
    await Promise.all([
      queryClient.ensureQueryData(trpc.categories.list.queryOptions()),
      queryClient.ensureQueryData(trpc.products.featured.queryOptions({ limit: 8 })),
      queryClient.ensureQueryData(trpc.products.list.queryOptions({ limit: 8 }))
    ])
    return
  },
  errorComponent: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bir Hata Oluştu</h1>
        <p className="text-gray-600">Sayfa yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>
      </div>
    </div>
  ),
  pendingComponent: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-600"></div>
    </div>
  ),
  component: App,
})

function App() {
  return (
    <TRPCProvider>
      <HomeContent />
    </TRPCProvider>
  )
}
