import { Link } from '@tanstack/react-router'
import { useTRPC } from '@/integrations/trpc/react'
import ProductCard from '../ProductCard'

interface RelatedProductsProps {
  productId: string
  categoryId: string
}

export default function RelatedProducts({ productId, categoryId }: RelatedProductsProps) {
  const trpc = useTRPC()
  const { data: categoryData, isLoading } = trpc.categories.getBySlug.useQuery({ slug: categoryId })

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!categoryData?.products || categoryData.products.length <= 1) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">İlgili ürün bulunmamaktadır.</p>
      </div>
    )
  }

  // Filter out the current product and limit to 8 products
  const relatedProducts = categoryData.products
    .filter(product => product.id !== productId)
    .slice(0, 8)

  if (relatedProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Bu kategoride başka ürün bulunmamaktadır.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">İlgili Ürünler</h2>
          <p className="text-gray-600 mt-1">
            {categoryData.name} kategorisindeki diğer ürünler
          </p>
        </div>
        <Link
          to="/kategoriler/$slug"
          params={{ slug: categoryId }}
          className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
        >
          Tümünü Gör →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showAddToCart={true}
            showQuickView={false}
          />
        ))}
      </div>

      {/* View More Button */}
      {categoryData.products.length > 8 && (
        <div className="text-center mt-8">
          <Link
            to="/kategoriler/$slug"
            params={{ slug: categoryId }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
          >
            {categoryData.name} Kategorisindeki Tüm Ürünler
          </Link>
        </div>
      )}
    </div>
  )
}