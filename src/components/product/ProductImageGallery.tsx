import { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn, Package } from 'lucide-react'

interface ProductImage {
  id: string
  url: string
  alt?: string
  sortOrder: number
}

interface ProductImageGalleryProps {
  images: ProductImage[]
  selectedIndex: number
  onImageSelect: (index: number) => void
}

export default function ProductImageGallery({
  images,
  selectedIndex,
  onImageSelect
}: ProductImageGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  const currentImage = images?.[selectedIndex]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setZoomPosition({ x, y })
  }

  const handlePreviousImage = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1
    onImageSelect(newIndex)
  }

  const handleNextImage = () => {
    const newIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0
    onImageSelect(newIndex)
  }

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <Package size={64} className="text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        {currentImage ? (
          <>
            {/* Image Container */}
            <div
              className="relative w-full h-full cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={currentImage.url}
                alt={currentImage.alt || 'Ürün görseli'}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{
                  transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center'
                }}
              />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                  aria-label="Önceki görsel"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                  aria-label="Sonraki görsel"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Zoom Indicator */}
            <div className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ZoomIn size={18} className="text-gray-700" />
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full backdrop-blur-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={64} className="text-gray-400" />
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onImageSelect(index)}
              className={`flex-shrink-0 relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === selectedIndex
                  ? 'border-cyan-600 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt || `Görsel ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === selectedIndex && (
                <div className="absolute inset-0 bg-cyan-600/20 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Additional Info */}
      <div className="text-sm text-gray-500 text-center">
        <p>Fare ile görselin üzerine gelerek yakınlaştırabilirsiniz</p>
      </div>
    </div>
  )
}