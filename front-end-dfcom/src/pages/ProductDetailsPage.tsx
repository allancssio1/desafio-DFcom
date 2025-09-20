import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Edit2, Trash2, Plus, MessageCircle } from 'lucide-react'
import LoadingSpinner from '@/components/common/Loading'
import ErrorMessage from '@/components/common/ErrorMensage'
import StarRating from '@/components/common/StarRating'
import ReviewCard from '@/components/reviews/ReviewCard'
import ReviewForm from '@/components/reviews/ReviewForm'
import { useProduct, useDeleteProduct } from '@/hooks/useProducts'
import {
  useProductReviews,
  useProductReviewStats,
  useCreateReview,
} from '@/hooks/useReviews'
import { formatCurrency, formatDate } from '@/lib/utils'

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showReviewForm, setShowReviewForm] = useState(false)

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useProduct(id!)
  const { data: reviews = [], isLoading: reviewsLoading } = useProductReviews(
    id!,
  )
  const { data: reviewStats } = useProductReviewStats(id!)
  const deleteProduct = useDeleteProduct()
  const createReview = useCreateReview()

  if (productLoading) {
    return <LoadingSpinner text="Carregando produto..." />
  }

  if (productError || !product) {
    return (
      <ErrorMessage
        title="Produto não encontrado"
        message={productError?.message || 'O produto solicitado não existe.'}
      />
    )
  }

  const handleDelete = () => {
    if (
      window.confirm(
        'Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.',
      )
    ) {
      deleteProduct.mutate(id!, {
        onSuccess: () => {
          navigate('/products')
        },
      })
    }
  }

  const handleCreateReview = (data: any) => {
    createReview.mutate(
      {
        ...data,
        productId: id!,
      },
      {
        onSuccess: () => {
          setShowReviewForm(false)
        },
      },
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="flex items-center space-x-2">
          <Link to="/products">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar aos Produtos</span>
          </Link>
        </Button>

        <div className="flex items-center space-x-3">
          <Button variant="outline" asChild>
            <Link
              to={`/products/${id}/edit`}
              className="flex items-center space-x-2"
            >
              <Edit2 className="h-4 w-4" />
              <span>Editar</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            disabled={deleteProduct.isPending}
            className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-white/60 backdrop-blur-sm border-0">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <CardTitle className="text-3xl font-bold text-slate-900">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {product.category}
                    </Badge>
                    <div className="text-3xl font-bold text-slate-900">
                      {formatCurrency(product.price)}
                    </div>
                  </div>
                </div>
              </div>

              {reviewStats && (
                <div className="flex items-center space-x-4 mt-4">
                  <StarRating
                    rating={reviewStats.averageRating}
                    size="lg"
                    showValue
                  />
                  <span className="text-slate-600">
                    ({reviewStats.totalReviews} avaliação
                    {reviewStats.totalReviews !== 1 ? 'ões' : ''})
                  </span>
                </div>
              )}
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Descrição</h3>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Criado em:</span>
                    <div className="font-medium">
                      {formatDate(product.createdAt)}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-600">Atualizado em:</span>
                    <div className="font-medium">
                      {formatDate(product.updatedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Stats Sidebar */}
        <div className="space-y-6">
          {reviewStats && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <span>Estatísticas de Avaliações</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900">
                    {reviewStats.averageRating.toFixed(1)}
                  </div>
                  <StarRating rating={reviewStats.averageRating} size="lg" />
                  <p className="text-slate-600 text-sm mt-2">
                    {reviewStats.totalReviews} avaliação
                    {reviewStats.totalReviews !== 1 ? 'ões' : ''}
                  </p>
                </div>

                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center space-x-2">
                      <span className="text-sm w-2">{stars}</span>
                      <StarRating rating={1} maxRating={1} size="sm" />
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 rounded-full h-2 transition-all duration-300"
                          style={{
                            width: `${
                              reviewStats.totalReviews > 0
                                ? (reviewStats.ratingDistribution[stars] /
                                    reviewStats.totalReviews) *
                                  100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-slate-600 w-6">
                        {reviewStats.ratingDistribution[stars] || 0}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            <span>Avaliações</span>
          </h2>

          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nova Avaliação</span>
          </Button>
        </div>

        {showReviewForm && (
          <ReviewForm
            onSubmit={handleCreateReview}
            isLoading={createReview.isPending}
          />
        )}

        <div className="space-y-6">
          {reviewsLoading ? (
            <LoadingSpinner text="Carregando avaliações..." />
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review._id} review={review} showActions />
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageCircle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Nenhuma avaliação ainda
                </h3>
                <p className="text-slate-600 mb-6">
                  Seja o primeiro a avaliar este produto!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
