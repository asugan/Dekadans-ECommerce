import { useState } from 'react'
import { Heart, ShoppingCart, Plus, Minus, Check, Package } from 'lucide-react'

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

interface ProductActionsProps {
  product: Product
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showAddedToCart, setShowAddedToCart] = useState(false)

  // Check stock status
  const inStock = !product.inventory?.trackQuantity ||
    (product.inventory.quantity > 0 || product.inventory.allowBackorder)

  const maxQuantity = product.inventory?.trackQuantity && product.inventory.quantity
    ? product.inventory.quantity
    : 99

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    if (!inStock || isAddingToCart) return

    setIsAddingToCart(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Show success state
      setShowAddedToCart(true)
      setTimeout(() => {
        setShowAddedToCart(false)
        setIsAddingToCart(false)
      }, 2000)

      console.log('Added to cart:', {
        productId: product.id,
        quantity,
        price: product.price,
        name: product.name
      })

    } catch (error) {
      console.error('Error adding to cart:', error)
      setIsAddingToCart(false)
    }
  }

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    console.log('Toggled wishlist:', {
      productId: product.id,
      isWishlisted: !isWishlisted,
      name: product.name
    })
  }

  const handleBuyNow = () => {
    console.log('Buy now:', {
      productId: product.id,
      quantity,
      price: product.price,
      name: product.name
    })
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Adet:</span>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Azalt"
          >
            <Minus size={16} />
          </button>
          <div className="w-12 text-center font-medium text-gray-900">
            {quantity}
          </div>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxQuantity}
            className="p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Artır"
          >
            <Plus size={16} />
          </button>
        </div>
        {product.inventory?.trackQuantity && product.inventory.quantity <= 10 && (
          <span className="text-sm text-orange-600">
            Sadece {product.inventory.quantity} ürün kaldı!
          </span>
        )}
      </div>

      {/* Total Price */}
      <div className="text-2xl font-bold text-gray-900">
        Toplam: ₺{(product.price * quantity).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock || isAddingToCart}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
            !inStock
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : showAddedToCart
              ? 'bg-green-500 text-white'
              : isAddingToCart
              ? 'bg-cyan-700 text-white cursor-wait'
              : 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {showAddedToCart ? (
            <>
              <Check size={24} />
              <span>Sepete Eklendi!</span>
            </>
          ) : isAddingToCart ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sepete Ekleniyor...</span>
            </>
          ) : !inStock ? (
            <>
              <Package size={24} />
              <span>Tükendi</span>
            </>
          ) : (
            <>
              <ShoppingCart size={24} />
              <span>Sepete Ekle</span>
            </>
          )}
        </button>

        {/* Buy Now Button */}
        <button
          onClick={handleBuyNow}
          disabled={!inStock}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
            !inStock
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white'
          }`}
        >
          Hemen Al
        </button>
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
          isWishlisted
            ? 'bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100'
            : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100'
        }`}
      >
        <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
        <span>{isWishlisted ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}</span>
      </button>

      {/* Shipping Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
        <h4 className="font-semibold text-gray-900">Kargo Bilgileri</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>150 TL ve üzeri siparişlerde kargo bedava</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Aynı gün kargo (14:00'a kadar verilen siparişler)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Kapıda ödeme seçeneği mevcut</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Güvenli Ödeme Seçenekleri</h4>
        <div className="flex flex-wrap gap-3">
          {['Visa', 'Mastercard', 'Amex', 'PayTR', 'İyzico'].map((method) => (
            <div
              key={method}
              className="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-600"
            >
              {method}
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield size={16} className="text-cyan-600" />
          <span>Güvenli Alışveriş</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <RefreshCw size={16} className="text-cyan-600" />
          <span>14 Gün İade</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Headphones size={16} className="text-cyan-600" />
          <span>7/24 Destek</span>
        </div>
      </div>
    </div>
  )
}

// Import missing icons
import { Shield, RefreshCw, Headphones } from 'lucide-react'