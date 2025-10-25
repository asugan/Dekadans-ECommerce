import { Link } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import {
  Home,
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Star,
  Package,
  Phone,
  Mail,
  MapPin,
  Heart,
} from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const categoriesRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery)
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 text-gray-300">
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <span>+90 212 555 0123</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span>info@dekadans.com</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/hakkimizda" className="hover:text-cyan-400 transition-colors">
              Hakkımızda
            </Link>
            <Link to="/iletisim" className="hover:text-cyan-400 transition-colors">
              İletişim
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={24} className="text-gray-700" />
              </button>

              <Link to="/" className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Dekadans
                  <span className="text-cyan-600">.com</span>
                </h1>
              </Link>

              {/* Desktop Categories */}
              <div className="hidden lg:block" ref={categoriesRef}>
                <button
                  onMouseEnter={() => setCategoriesOpen(true)}
                  className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-cyan-600 transition-colors font-medium"
                >
                  Kategoriler
                  <ChevronDown size={16} />
                </button>

                {/* Categories Dropdown */}
                {categoriesOpen && (
                  <div
                    onMouseEnter={() => setCategoriesOpen(true)}
                    onMouseLeave={() => setCategoriesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                  >
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Popüler Kategoriler</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to="/kategoriler/tesettur-giyim"
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors"
                        >
                          <Package size={16} className="text-cyan-600" />
                          <span className="text-gray-700">Tesettür Giyim</span>
                        </Link>
                        <Link
                          to="/kategoriler/ev-yasam"
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors"
                        >
                          <Package size={16} className="text-cyan-600" />
                          <span className="text-gray-700">Ev & Yaşam</span>
                        </Link>
                        <Link
                          to="/kategoriler/kitaplar"
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors"
                        >
                          <Package size={16} className="text-cyan-600" />
                          <span className="text-gray-700">Kitaplar</span>
                        </Link>
                        <Link
                          to="/kategoriler/kozmetik"
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors"
                        >
                          <Package size={16} className="text-cyan-600" />
                          <span className="text-gray-700">Kozmetik</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ürün, kategori veya marka ara..."
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-cyan-600 transition-colors"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link
                to="/favoriler"
                className="p-2 text-gray-700 hover:text-cyan-600 transition-colors relative"
                title="Favorilerim"
              >
                <Heart size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              <Link
                to="/sepet"
                className="p-2 text-gray-700 hover:text-cyan-600 transition-colors relative"
                title="Sepetim"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              <Link
                to="/hesabim"
                className="flex items-center gap-2 p-2 text-gray-700 hover:text-cyan-600 transition-colors"
                title="Hesabım"
              >
                <User size={20} />
                <span className="hidden lg:inline text-sm font-medium">Hesabım</span>
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ürün ara..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-cyan-600"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Menü</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors mb-2 text-gray-700"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-50 text-cyan-600 font-medium mb-2',
            }}
          >
            <Home size={20} />
            <span>Anasayfa</span>
          </Link>

          <div className="border-t border-gray-200 my-4 pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Kategoriler</h3>
            <div className="space-y-2">
              <Link
                to="/kategoriler/tesettur-giyim"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <Package size={20} />
                <span>Tesettür Giyim</span>
              </Link>
              <Link
                to="/kategoriler/ev-yasam"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <Package size={20} />
                <span>Ev & Yaşam</span>
              </Link>
              <Link
                to="/kategoriler/kitaplar"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <Package size={20} />
                <span>Kitaplar</span>
              </Link>
              <Link
                to="/kategoriler/kozmetik"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <Package size={20} />
                <span>Kozmetik</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-200 my-4 pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Hesabım</h3>
            <div className="space-y-2">
              <Link
                to="/favoriler"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <Heart size={20} />
                <span>Favorilerim</span>
              </Link>
              <Link
                to="/sepet"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <ShoppingCart size={20} />
                <span>Sepetim</span>
              </Link>
              <Link
                to="/hesabim"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <User size={20} />
                <span>Hesabım</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-200 my-4 pt-4">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+90 212 555 0123</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@dekadans.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
