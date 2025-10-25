import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, Package, Truck, Shield, RefreshCw } from 'lucide-react'
import ProductImageGallery from './ProductImageGallery'
import ProductInfo from './ProductInfo'
import ProductActions from './ProductActions'
import ProductTabs from './ProductTabs'
import RelatedProducts from './RelatedProducts'

interface ProductImage {
  id: string
  url: string
  alt?: string
  sortOrder: number
}

interface Inventory {
  quantity: number
  trackQuantity: boolean
  allowBackorder: boolean
}

interface ProductReview {
  id: string
  rating: number
  title?: string
  comment?: string
  createdAt: string
  user: {
    name: string
  }
}

interface Product {
  id: string
  name: string
  slug: string
  description?: string
  shortDesc?: string
  price: number
  comparePrice?: number
  sku?: string
  weight?: number
  dimensions?: any
  images: ProductImage[]
  inventory?: Inventory
  category?: {
    name: string
    slug: string
  }
  reviews?: ProductReview[]
  tags?: string
}

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const mainImage = product.images?.[selectedImageIndex]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 h-12 text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-cyan-600 transition-colors">
                Anasayfa
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            {product.category && (
              <>
                <li>
                  <Link
                    to = "/"
                    className="text-gray-500 hover:text-cyan-600 transition-colors"
                  >
                    {product.category.name}
                  </Link>
                </li>
                <li className="text-gray-300">/</li>
              </>
            )}
            <li className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 transition-colors mb-6"
        >
          <ChevronLeft size={20} />
          <span>Geri Dön</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ProductImageGallery
              images={product.images}
              selectedIndex={selectedImageIndex}
              onImageSelect={setSelectedImageIndex}
            />
          </div>

          {/* Product Info and Actions */}
          <div className="space-y-6">
            <ProductInfo product={product} />
            <ProductActions product={product} />

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col items-center text-center p-3">
                  <Truck className="text-cyan-600 mb-2" size={24} />
                  <span className="text-sm text-gray-600">Kargo Bedava</span>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <Shield className="text-cyan-600 mb-2" size={24} />
                  <span className="text-sm text-gray-600">Güvenli Ödeme</span>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <RefreshCw className="text-cyan-600 mb-2" size={24} />
                  <span className="text-sm text-gray-600">İade Garantisi</span>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <Package className="text-cyan-600 mb-2" size={24} />
                  <span className="text-sm text-gray-600">Özenle Paketleme</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <ProductTabs product={product} />

        {/* Related Products */}
{/*         {product.category && (
          <div className="mt-16">
            <RelatedProducts
              productId={product.id}
              categoryId={product.category.slug}
            />
          </div>
        )} */}
      </div>
    </div>
  )
}