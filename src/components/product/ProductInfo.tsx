import { Star, Check, X, Package } from 'lucide-react'

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

interface ProductInfoProps {
  product: Product
}

export default function ProductInfo({ product }: ProductInfoProps) {
  // Calculate average rating
  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0

  // Calculate discount percentage
  const discountPercentage = product.comparePrice && product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  // Check stock status
  const inStock = !product.inventory?.trackQuantity ||
    (product.inventory.quantity > 0 || product.inventory.allowBackorder)

  const stockStatus = product.inventory?.trackQuantity
    ? product.inventory.quantity > 0
      ? product.inventory.quantity <= 5
        ? { text: `Son ${product.inventory.quantity} ürün`, color: 'text-orange-600' }
        : { text: 'Stokta mevcut', color: 'text-green-600' }
      : product.inventory.allowBackorder
      ? { text: 'Sipariş verilebilir', color: 'text-blue-600' }
      : { text: 'Tükendi', color: 'text-red-600' }
    : { text: 'Stokta mevcut', color: 'text-green-600' }

  return (
    <div className="space-y-6">
      {/* Category */}
      {product.category && (
        <div>
          <a
            href={`/kategoriler/${product.category.slug}`}
            className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors font-medium"
          >
            {product.category.name}
          </a>
        </div>
      )}

      {/* Product Name */}
      <h1 className="text-3xl font-bold text-gray-900 leading-tight">
        {product.name}
      </h1>

      {/* Rating and Reviews */}
      {averageRating > 0 && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className={star <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-gray-600 font-medium">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-gray-500">
            ({product.reviews?.length || 0} değerlendirme)
          </span>
        </div>
      )}

      {/* Short Description */}
      {product.shortDesc && (
        <div className="text-gray-600 leading-relaxed">
          {product.shortDesc}
        </div>
      )}

      {/* Price Section */}
      <div className="space-y-3">
        <div className="flex items-baseline gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              ₺{product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-xl text-gray-500 line-through">
                ₺{product.comparePrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>

          {discountPercentage > 0 && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              %{discountPercentage} İNDİRİM
            </div>
          )}
        </div>

        {/* Tax Info */}
        <div className="text-sm text-gray-500">
          KDV Dahil
        </div>
      </div>

      {/* Stock Status */}
      <div className={`flex items-center gap-2 ${stockStatus.color}`}>
        {inStock ? (
          <Check size={20} className="text-current" />
        ) : (
          <X size={20} className="text-current" />
        )}
        <span className="font-medium">{stockStatus.text}</span>
      </div>

      {/* Product Features */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Ürün Özellikleri</h3>
        <div className="space-y-3">
          {product.sku && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Stok Kodu:</span>
              <span className="font-medium text-gray-900">{product.sku}</span>
            </div>
          )}

          {product.category && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Kategori:</span>
              <span className="font-medium text-gray-900">{product.category.name}</span>
            </div>
          )}

          {product.weight && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ağırlık:</span>
              <span className="font-medium text-gray-900">{product.weight} kg</span>
            </div>
          )}

          {product.dimensions && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Boyutlar:</span>
              <span className="font-medium text-gray-900">
                {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
              </span>
            </div>
          )}

          {product.inventory?.trackQuantity && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Stok Takibi:</span>
              <span className="font-medium text-gray-900">
                {product.inventory.trackQuantity ? 'Evet' : 'Hayır'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {product.tags && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Etiketler</h3>
          <div className="flex flex-wrap gap-2">
            {product.tags.split(',').map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <h3 className="font-semibold text-cyan-900 mb-3">Neden Dekadan Sanat?</h3>
        <ul className="space-y-2 text-sm text-cyan-800">
          <li className="flex items-start gap-2">
            <Check size={16} className="text-cyan-600 mt-0.5 flex-shrink-0" />
            <span>100% orijinal ve kaliteli ürünler</span>
          </li>
          <li className="flex items-start gap-2">
            <Check size={16} className="text-cyan-600 mt-0.5 flex-shrink-0" />
            <span>Güvenli ödeme sistemi</span>
          </li>
          <li className="flex items-start gap-2">
            <Check size={16} className="text-cyan-600 mt-0.5 flex-shrink-0" />
            <span>Hızlı ve özenli paketleme</span>
          </li>
          <li className="flex items-start gap-2">
            <Check size={16} className="text-cyan-600 mt-0.5 flex-shrink-0" />
            <span>Müşteri memnuniyeti garantisi</span>
          </li>
        </ul>
      </div>
    </div>
  )
}