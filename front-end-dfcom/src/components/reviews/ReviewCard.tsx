import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit2, Trash2, User } from 'lucide-react'
import StarRating from '@/components/common/StarRating'
import ReviewForm from './ReviewForm'
import { useUpdateReview, useDeleteReview } from '@/hooks/useReviews'
import type { Review } from '@/types/review'
import { formatDate } from '@/lib/utils'

interface ReviewCardProps {
  review: Review
  showActions?: boolean
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  showActions = false,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const updateReview = useUpdateReview()
  const deleteReview = useDeleteReview()

  const handleUpdate = (data: any) => {
    updateReview.mutate(
      {
        id: review._id,
        data,
      },
      {
        onSuccess: () => {
          setIsEditing(false)
        },
      },
    )
  }

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta avaliação?')) {
      deleteReview.mutate(review._id)
    }
  }

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Editar Avaliação</h3>
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ReviewForm
            review={review}
            onSubmit={handleUpdate}
            isLoading={updateReview.isPending}
            submitLabel="Atualizar Avaliação"
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">{review.author}</h4>
              <p className="text-sm text-slate-600">
                {formatDate(review.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <StarRating rating={review.rating} size="sm" />
            {showActions && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="text-slate-600 hover:text-blue-600"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  disabled={deleteReview.isPending}
                  className="text-slate-600 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-slate-700 leading-relaxed">{review.comment}</p>

        {review.productDetails && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Produto:</span>
              <Badge variant="outline">{review.productDetails.name}</Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ReviewCard
