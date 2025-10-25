import { createFileRoute } from '@tanstack/react-router'
import { Package } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { ProductContent } from '@/components/ProductContent'

export const Route = createFileRoute('/urunler/$slug')({
  loader: async ({ params, context: { trpc, queryClient } }) => {
    // Pre-fetch product data on the server side
    await queryClient.ensureQueryData(trpc.products.getBySlug.queryOptions({ slug: params.slug }))
    return
  },
  errorComponent: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Package size={64} className="text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bir Hata Oluştu</h1>
        <p className="text-gray-600 mb-6">Ürün yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Anasayfaya Dön
        </Link>
      </div>
    </div>
  ),
  pendingComponent: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    </div>
  ),
  component: App,
})

function App() {
  const { slug } = Route.useParams()
  return <ProductContent slug={slug} />
}