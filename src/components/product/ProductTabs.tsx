import { useState } from 'react'
import { Truck, Package, FileText, MessageSquare, Star } from 'lucide-react'
import ProductReviews from './ProductReviews'
import ProductQuestions from './ProductQuestions'

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
  userId: string
  productId: string
  rating: number
  title: string | null
  comment: string | null
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
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

interface ProductTabsProps {
  product: Product
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description')

  const tabs = [
    { id: 'description', label: 'Ürün Açıklaması', icon: FileText },
    { id: 'reviews', label: 'Değerlendirmeler', icon: Star, count: product.reviews?.length },
    { id: 'questions', label: 'Sorular', icon: MessageSquare },
    { id: 'shipping', label: 'Kargo ve İade', icon: Truck },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-cyan-600 text-cyan-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'description' && (
          <div className="space-y-6">
            {product.description ? (
              <div className="prose prose-cyan max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="text-gray-700 leading-relaxed"
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText size={64} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Bu ürün için detaylı açıklama bulunmamaktadır.</p>
              </div>
            )}

            {/* Additional Product Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Ek Bilgiler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Materyal</h4>
                  <p className="text-gray-600 text-sm">
                    Ürünün malzeme bilgileri burada yer alacak.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Bakım Talimatları</h4>
                  <p className="text-gray-600 text-sm">
                    Ürünün kullanım ve bakım bilgileri burada yer alacak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <ProductReviews productId={product.id} reviews={product.reviews || []} />
        )}

        {activeTab === 'questions' && (
          <ProductQuestions productId={product.id} />
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="text-cyan-600" size={24} />
                  <h3 className="font-semibold text-gray-900">Kargo Bilgileri</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full mt-1.5"></div>
                    <div>
                      <strong>Standart Kargo:</strong> 2-4 iş günü içinde teslimat
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full mt-1.5"></div>
                    <div>
                      <strong>Express Kargo:</strong> 1-2 iş günü içinde teslimat
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full mt-1.5"></div>
                    <div>
                      <strong>Kargo Ücreti:</strong> 150 TL ve üzeri siparişlerde ücretsiz
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-cyan-600 rounded-full mt-1.5"></div>
                    <div>
                      <strong>Kargo Takibi:</strong> Sipariş durumunuzu online takip edebilirsiniz
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="text-cyan-600" size={24} />
                  <h3 className="font-semibold text-gray-900">İade Koşulları</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                    <div>
                      <strong>14 Gün İade Hakkı:</strong> Ürünü teslim aldıktan sonra 14 gün içinde iade edebilirsiniz
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                    <div>
                      <strong>İade Durumu:</strong> Ürünün kullanılmamış ve ambalajı bozulmamış olmalıdır
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                    <div>
                      <strong>İade Ücreti:</strong> Ürün hatası durumunda iade ücretsizdir
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                    <div>
                      <strong>Geri Ödeme:</strong> İade onaylandıktan sonra 3-5 iş günü içinde iade edilir
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
              <h3 className="font-semibold text-cyan-900 mb-4">Önemli Bilgiler</h3>
              <div className="space-y-3 text-sm text-cyan-800">
                <p>
                  <strong>Adres Doğrulama:</strong> Kargo yetkilisi adresinizde bulunamazsa, ürün en yakın kargo şubesine
                  teslim edilir.
                </p>
                <p>
                  <strong>Hasarlı Ürün:</strong> Kargo sırasında hasar gören ürünleri teslim almayın ve kargo yetkilisine
                  tutanak tutturun.
                </p>
                <p>
                  <strong>Çoklu Adres:</strong> Farklı teslimat ve fatura adresi belirleyebilirsiniz.
                </p>
                <p>
                  <strong>Yurtdışı Kargo:</strong> Yurtdışı teslimatlar için lütfen müşteri hizmetleri ile iletişime geçin.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}