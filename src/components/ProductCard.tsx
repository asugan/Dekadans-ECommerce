import { Link } from '@tanstack/react-router'
import { Heart, ShoppingCart, Star, Package } from 'lucide-react'
import { useState } from 'react'

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

interface Product {
  id: string
  name: string
  slug: string
  description?: string
  shortDesc?: string
  price: number
  comparePrice?: number
  sku?: string
  images: ProductImage[]
  inventory?: Inventory
  category?: {
    name: string
    slug: string
  }
  reviews?: {
    rating: number
  }[]
}

interface ProductCardProps {
  product: Product
  className?: string
  showAddToCart?: boolean
  showQuickView?: boolean
}

export default function ProductCard({
  product,
  className = '',
  showAddToCart = true,
  showQuickView = false
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const mainImage = product.images?.[0]
  const inStock = !product.inventory?.trackQuantity ||
    (product.inventory.quantity > 0 || product.inventory.allowBackorder)

  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
    : 0

  const discountPercentage = product.comparePrice && product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!inStock) return

    setIsAddingToCart(true)
    // Implement add to cart functionality
    console.log('Adding to cart:', product.id)

    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    // Implement wishlist functionality
    console.log('Toggling wishlist:', product.id)
  }

  return (
    <div className={`group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-cyan-300 transition-all duration-300 overflow-hidden ${className}`}>
      {/* Product Images */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {mainImage ? (
          <img
            src={mainImage.url}
            alt={mainImage.alt || product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={48} className="text-gray-400" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountPercentage > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              %{discountPercentage} İNDİRİM
            </div>
          )}
          {!inStock && (
            <div className="bg-gray-600 text-white px-2 py-1 rounded text-xs font-semibold">
              TÜKENDİ
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isWishlisted
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
            title={isWishlisted ? "Favorilerden çıkar" : "Favorilere ekle"}
          >
            <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Quick Add to Cart Button */}
        {showAddToCart && (
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!inStock || isAddingToCart}
              className={`w-full py-2 px-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                !inStock
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : isAddingToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg'
              }`}
            >
              {isAddingToCart ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Eklendi</span>
                </>
              ) : !inStock ? (
                <span>Tükendi</span>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  <span>Sepete Ekle</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <Link
            to={`/kategoriler/${product.category.slug}`}
            className="text-xs text-cyan-600 hover:text-cyan-700 transition-colors mb-1 block"
            onClick={(e) => e.stopPropagation()}
          >
            {product.category.name}
          </Link>
        )}

        {/* Product Name */}
        <Link
          to={`/urunler/${product.slug}`}
          className="block group-hover:text-cyan-600 transition-colors"
        >
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        {product.shortDesc && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {product.shortDesc}
          </p>
        )}

        {/* Rating */}
        {averageRating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {averageRating.toFixed(1)}
              {product.reviews && ` (${product.reviews.length})`}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ₺{product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ₺{product.comparePrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
        </div>

        {/* Stock Info */}
        {product.inventory?.trackQuantity && (
          <div className="mt-2">
            {product.inventory.quantity <= 5 && product.inventory.quantity > 0 ? (
              <div className="text-xs text-orange-600 font-medium">
                Son {product.inventory.quantity} ürün
              </div>
            ) : product.inventory.quantity > 5 ? (
              <div className="text-xs text-green-600 font-medium">
                Stokta mevcut
              </div>
            ) : (
              <div className="text-xs text-red-600 font-medium">
                Tükendi
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}