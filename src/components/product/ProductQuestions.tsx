import { useState } from 'react'
import { MessageSquare, Send, User, Check } from 'lucide-react'

interface ProductQuestion {
  id: string
  question: string
  answer?: string
  createdAt: string
  user: {
    name: string
  }
}

interface ProductQuestionsProps {
  productId: string
}

export default function ProductQuestions({ productId }: ProductQuestionsProps) {
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [questionText, setQuestionText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock data - in real app, this would come from API
  const [questions] = useState<ProductQuestion[]>([
    {
      id: '1',
      question: 'Bu ürünün kargo süresi ne kadar?',
      answer: 'Standart kargo ile 2-4 iş günü içinde teslimat yapılmaktadır. Express kargo seçeneği ile 1-2 iş gününde teslim alabilirsiniz.',
      createdAt: '2024-01-15T10:30:00Z',
      user: { name: 'Ahmet Yılmaz' }
    },
    {
      id: '2',
      question: 'Ürün orijinal mi ve garantili mi?',
      answer: 'Evet, tüm ürünlerimiz %100 orijinal ve üretici garantilidir. Ürün yanında garanti belgesi gönderilmektedir.',
      createdAt: '2024-01-14T14:20:00Z',
      user: { name: 'Ayşe Demir' }
    },
    {
      id: '3',
      question: 'İade etmek isterseniz ne yapmalıyım?',
      answer: '14 gün içinde koşulsuz iade hakkınız bulunmaktadır. İade için müşteri hizmetlerimizle iletişime geçebilir veya online iade formunu doldurabilirsiniz.',
      createdAt: '2024-01-13T09:15:00Z',
      user: { name: 'Mehmet Kaya' }
    }
  ])

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!questionText.trim() || isSubmitting) return

    setIsSubmitting(true)

    try {
      // API call will be implemented later
      console.log('Submitting question:', {
        productId,
        question: questionText
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Reset form
      setQuestionText('')
      setShowQuestionForm(false)
    } catch (error) {
      console.error('Error submitting question:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-gray-900">Ürün Hakkında Sorular</h3>
          <p className="text-sm text-gray-600 mt-1">
            Bu ürün hakkında {questions.length} soru bulunmaktadır
          </p>
        </div>
        <button
          onClick={() => setShowQuestionForm(!showQuestionForm)}
          className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
        >
          Soru Sor
        </button>
      </div>

      {/* Question Form */}
      {showQuestionForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Sorunuzu Yazın</h4>
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <div>
              <label htmlFor="question-text" className="block text-sm font-medium text-gray-700 mb-2">
                Sorunuz
              </label>
              <textarea
                id="question-text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Bu ürün hakkında merak ettiğiniz bir şey mi var? Sorun, en kısa sürede yanıtlayalım..."
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Önemli:</strong> Sipariş durumunuz, kargo takibi veya iade işlemleriyle ilgili sorularınız için
                lütfen canlı destek veya müşteri hizmetleri ile iletişime geçin.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!questionText.trim() || isSubmitting}
                className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Gönderiliyor...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Soru Gönder</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowQuestionForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.length > 0 ? (
          questions.map((qa) => (
            <div key={qa.id} className="border-b border-gray-200 pb-4 last:border-b-0">
              {/* Question */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{qa.user.name}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(qa.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                  <div className="text-gray-800">{qa.question}</div>
                </div>
              </div>

              {/* Answer */}
              {qa.answer && (
                <div className="flex items-start gap-3 ml-11">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-cyan-900">Dekadan Sanat</span>
                      <span className="bg-cyan-100 text-cyan-700 text-xs px-2 py-0.5 rounded-full">
                        Satıcı
                      </span>
                    </div>
                    <div className="text-gray-700">{qa.answer}</div>
                  </div>
                </div>
              )}

              {!qa.answer && (
                <div className="ml-11">
                  <div className="text-sm text-orange-600 italic">
                    Bu soru henüz yanıtlanmamış.
                  </div>
                </div>
              )}

              {/* Helpful Buttons */}
              <div className="flex items-center gap-4 ml-11 mt-3">
                <button className="text-sm text-gray-500 hover:text-cyan-600 transition-colors">
                  Bu yanıt faydalı mı? Evet / Hayır
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageSquare size={64} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Henüz soru sorulmamış.</p>
            <p className="text-gray-600 text-sm">
              Bu ürün hakkında merak ettiğiniz bir şey varsa, hemen bir soru sorun!
            </p>
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Sıkça Sorulan Sorular</h4>
        <div className="space-y-3">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
              <span className="font-medium text-gray-900">Kargo ne kadar sürede ulaşır?</span>
            </summary>
            <p className="mt-2 px-3 text-gray-600">
              Standart kargo 2-4 iş günü, express kargo 1-2 iş günü içinde teslim edilir.
            </p>
          </details>

          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
              <span className="font-medium text-gray-900">İade etme süreci nasıl işler?</span>
            </summary>
            <p className="mt-2 px-3 text-gray-600">
              14 gün içinde koşulsuz iade hakkınız bulunmaktadır. İade için online formu doldurmanız yeterlidir.
            </p>
          </details>

          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
              <span className="font-medium text-gray-900">Ürün orijinal ve garantili mi?</span>
            </summary>
            <p className="mt-2 px-3 text-gray-600">
              Evet, tüm ürünlerimiz %100 orijinal ve üretici garantilidir.
            </p>
          </details>
        </div>
      </div>
    </div>
  )
}