import { useState } from 'react'
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Filter, ChevronDown } from 'lucide-react'

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

interface ProductReviewsProps {
  productId: string
  reviews: ProductReview[]
}

export default function ProductReviews({ productId, reviews }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [sortBy, setSortBy] = useState('recent')
  const [filterRating, setFilterRating] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }))

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0

  const filteredReviews = reviews
    .filter(review => filterRating === 0 || review.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === 'rating-high') return b.rating - a.rating
      if (sortBy === 'rating-low') return a.rating - b.rating
      return 0
    })

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const reviewData = {
      productId,
      rating: selectedRating,
      title: formData.get('title') as string,
      comment: formData.get('comment') as string,
    }

    console.log('Submitting review:', reviewData)
    // API call will be implemented later

    // Reset form
    setShowReviewForm(false)
    setSelectedRating(0)
    e.currentTarget.reset()
  }

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                className={star <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <div className="text-gray-600">
            {reviews.length} değerlendirme
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span className="text-sm text-gray-600">{rating}</span>
                <Star size={14} className="text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
        >
          Değerlendirme Yaz
        </button>

        {/* Filters and Sort */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} />
            <span>Filtrele</span>
            <ChevronDown size={16} className={showFilters ? 'rotate-180' : ''} />
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="recent">En Yeni</option>
            <option value="rating-high">En Yüksek Puan</option>
            <option value="rating-low">En Düşük Puan</option>
          </select>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Değerlendirmenizi Yazın</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Rating Stars */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Puanınız
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setSelectedRating(rating)}
                    className="p-1 transition-colors"
                  >
                    <Star
                      size={24}
                      className={rating <= selectedRating ? 'text-yellow-400 fill-current hover:text-yellow-500' : 'text-gray-300 hover:text-gray-400'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 mb-2">
                Değerlendirme Başlığı
              </label>
              <input
                id="review-title"
                name="title"
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Değerlendirmenizi özetleyin..."
              />
            </div>

            {/* Comment */}
            <div>
              <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 mb-2">
                Yorumunuz
              </label>
              <textarea
                id="review-comment"
                name="comment"
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Ürün deneyiminizi paylaşın..."
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={selectedRating === 0}
                className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Gönder
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filtrele:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterRating(0)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filterRating === 0
                    ? 'bg-cyan-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                Tümü
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilterRating(rating)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 ${
                    filterRating === rating
                      ? 'bg-cyan-600 text-white'
                      : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {rating}
                  <Star size={12} className="fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-medium text-gray-900">{review.user.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                </div>
              </div>

              {review.title && (
                <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
              )}

              {review.comment && (
                <p className="text-gray-700 mb-3">{review.comment}</p>
              )}

              {/* Review Actions */}
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-cyan-600 transition-colors">
                  <ThumbsUp size={14} />
                  <span>Faydalı</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-cyan-600 transition-colors">
                  <ThumbsDown size={14} />
                  <span>Faydasız</span>
                </button>
                <button className="text-sm text-gray-500 hover:text-cyan-600 transition-colors">
                  Şikayet Et
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare size={64} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {filterRating > 0 ? 'Bu puanlama için değerlendirme bulunmamaktadır.' : 'Henüz değerlendirme yapılmamış.'}
            </p>
            {filterRating > 0 && (
              <button
                onClick={() => setFilterRating(0)}
                className="mt-4 text-cyan-600 hover:text-cyan-700 font-medium"
              >
                Filtreyi Temizle
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}