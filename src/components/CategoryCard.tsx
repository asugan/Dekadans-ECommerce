import { Link } from '@tanstack/react-router'
import { Package } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  _count?: {
    products: number
  }
}

interface CategoryCardProps {
  category: Category
  className?: string
}

export default function CategoryCard({ category, className = '' }: CategoryCardProps) {
  return (
    <Link
      to={`/kategoriler/${category.slug}`}
      className={`group block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-cyan-300 transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="aspect-square bg-gradient-to-br from-cyan-50 to-blue-50 relative overflow-hidden">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={48} className="text-cyan-400" />
          </div>
        )}

        {/* Product count badge */}
        {category._count?.products > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {category._count.products} ürün
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  )
}