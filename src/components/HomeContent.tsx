import { useTRPC } from '@/integrations/trpc/react'
import { useQuery } from '@tanstack/react-query'
import CategoryCard from '@/components/CategoryCard'
import ProductCard from '@/components/ProductCard'
import {
  ShoppingCart,
  Package,
  Truck,
  Shield,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Sparkles,
  Clock
} from 'lucide-react'
import { Link } from '@tanstack/react-router'

export function HomeContent() {
  const trpc = useTRPC()

  // Fetch categories and products using proper TanStack Start pattern
  const categoriesQuery = useQuery(trpc.categories.list.queryOptions())
  const featuredProductsQuery = useQuery(trpc.products.featured.queryOptions({ limit: 8 }))
  const recentProductsQuery = useQuery(trpc.products.list.queryOptions({ limit: 8 }))

  // Transform data to match component interfaces
  const categories = categoriesQuery.data?.map(category => ({
    ...category,
    description: category.description || undefined,
    image: category.image || undefined
  }))

  const featuredProducts = featuredProductsQuery.data?.map(product => ({
    ...product,
    description: product.description || undefined,
    shortDesc: product.shortDesc || undefined,
    comparePrice: product.comparePrice ? Number(product.comparePrice) : undefined,
    price: Number(product.price),
    sku: product.sku || undefined
  }))

  const recentProducts = recentProductsQuery.data?.products?.map(product => ({
    ...product,
    description: product.description || undefined,
    shortDesc: product.shortDesc || undefined,
    comparePrice: product.comparePrice ? Number(product.comparePrice) : undefined,
    price: Number(product.price),
    sku: product.sku || undefined
  }))

  const features = [
    {
      icon: <Truck className="w-8 h-8 text-cyan-600" />,
      title: "Kargo Bedava",
      description: "150₺ ve üzeri alışverişlerde ücretsiz kargo"
    },
    {
      icon: <Shield className="w-8 h-8 text-cyan-600" />,
      title: "Güvenli Alışveriş",
      description: "256bit SSL ile korunan ödemeler"
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-cyan-600" />,
      title: "Kolay İade",
      description: "14 gün içinde koşulsuz iade"
    },
    {
      icon: <Phone className="w-8 h-8 text-cyan-600" />,
      title: "7/24 Destek",
      description: "Müşteri hizmetleri her zaman yanınızda"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-cyan-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Dekadans ile
              <span className="block text-yellow-300">Kaliteli Yaşam</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-cyan-50 max-w-3xl mx-auto">
              Tesettür giyim, ev yaşam, kitap ve daha birçok kategoride
              özenle seçilmiş ürünler sizi bekliyor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-8 py-3 bg-white text-cyan-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Alışverişe Başla
              </Link>
              <Link
                to="/"
                className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles size={20} />
                Kampanyaları Gör
              </Link>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {[
              { number: "10K+", label: "Mutlu Müşteri" },
              { number: "500+", label: "Ürün Çeşidi" },
              { number: "99%", label: "Müşteri Memnuniyeti" },
              { number: "24/7", label: "Destek" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300">
                  {stat.number}
                </div>
                <div className="text-cyan-50 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popüler Kategoriler
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              İhtiyacınıza uygun kategorileri keşfedin, kaliteli ürünlere kolayca ulaşın
            </p>
          </div>

          {categoriesQuery.isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg aspect-square animate-pulse"></div>
              ))}
            </div>
          ) : categories && categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.slice(0, 8).map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  className="transform hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Henüz kategori eklenmemiş</p>
            </div>
          )}

          {categories && categories.length > 8 && (
            <div className="text-center mt-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Tüm Kategorileri Gör
                <ChevronRight size={20} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Öne Çıkan Ürünler
              </h2>
              <p className="text-lg text-gray-600">
                Özenle seçilmiş en popüler ürünlerimiz
              </p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              Tümünü Gör
              <ChevronRight size={20} />
            </Link>
          </div>

          {featuredProductsQuery.isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg aspect-3/4 animate-pulse"></div>
              ))}
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className="transform hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Henüz öne çıkan ürün eklenmemiş</p>
            </div>
          )}
        </div>
      </section>

      {/* New Products Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Yeni Eklenenler
              </h2>
              <p className="text-lg text-gray-600">
                En son eklediğimiz güncel ürünler
              </p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              Tümünü Gör
              <ChevronRight size={20} />
            </Link>
          </div>

          {recentProductsQuery.isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg aspect-3/4 animate-pulse"></div>
              ))}
            </div>
          ) : recentProducts && recentProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className="transform hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Henüz yeni ürün eklenmemiş</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-linear-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Mail className="w-16 h-16 text-yellow-300 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Özel Fırsatlardan Haberdar Olun
          </h2>
          <p className="text-xl text-cyan-50 mb-8">
            E-posta bültenimize kaydolun, %10 indirim kazanın ve özel kampanyaları ilk siz öğrenin
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
            >
              Abone Ol
            </button>
          </form>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <Phone className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bizi Arayın</h3>
              <p className="text-gray-600">+90 212 555 0123</p>
              <p className="text-sm text-gray-500 mt-1">Hafta içi 09:00 - 18:00</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Mail className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">E-posta</h3>
              <p className="text-gray-600">info@dekadans.com</p>
              <p className="text-sm text-gray-500 mt-1">24 saat içinde yanıt</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <MapPin className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Adres</h3>
              <p className="text-gray-600">Mecidiyeköy, İstanbul</p>
              <p className="text-sm text-gray-500 mt-1">Türkiye</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}