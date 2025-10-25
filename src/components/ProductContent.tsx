import { useTRPC } from '@/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Package } from 'lucide-react'
import ProductDetail from '@/components/product/ProductDetail'

export function ProductContent({ slug }: { slug: string }) {
  const trpc = useTRPC()

  // Fetch product using proper TanStack Start pattern
  const productQuery = useQuery(trpc.products.getBySlug.queryOptions({ slug }))

  // Transform data to match component interface
  const product = productQuery.data ? {
    ...productQuery.data,
    description: productQuery.data.description || undefined,
    shortDesc: productQuery.data.shortDesc || undefined,
    comparePrice: productQuery.data.comparePrice ? Number(productQuery.data.comparePrice) : undefined,
    price: Number(productQuery.data.price),
    sku: productQuery.data.sku || undefined,
    weight: productQuery.data.weight ? Number(productQuery.data.weight) : undefined,
    tags: productQuery.data.tags || undefined,
    // Transform images to match component interface
    images: productQuery.data.images.map((img: any) => ({
      ...img,
      alt: img.alt || undefined
    })),
    // Transform inventory to match component interface or set to undefined if null
    inventory: productQuery.data.inventory || undefined
  } : null

  if (productQuery.error || !product) {
    console.log(productQuery.error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package size={64} className="text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ürün Bulunamadı</h1>
          <p className="text-gray-600 mb-6">Aradığınız ürün mevcut değil veya kaldırılmış.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    )
  }

  return <ProductDetail product={product} />
}