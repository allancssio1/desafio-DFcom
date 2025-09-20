import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import StarRating from '@/components/common/StarRating'
import { reviewSchema, type ReviewFormData } from '@/lib/validation'
import type { Review } from '@/types/review'

interface ReviewFormProps {
  review?: Review
  onSubmit: (data: ReviewFormData) => void
  isLoading?: boolean
  submitLabel?: string
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  review,
  onSubmit,
  isLoading = false,
  submitLabel = 'Enviar Avaliação',
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: review
      ? {
          author: review.author,
          rating: review.rating,
          comment: review.comment,
        }
      : {
          author: '',
          rating: 5,
          comment: '',
        },
  })

  const currentRating = watch('rating')

  const handleRatingChange = (newRating: number) => {
    setValue('rating', newRating)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{review ? 'Editar Avaliação' : 'Nova Avaliação'}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="author">Seu Nome</Label>
            <Input
              id="author"
              type="text"
              placeholder="Ex: João Silva"
              {...register('author')}
              className={errors.author ? 'border-red-500' : ''}
            />
            {errors.author && (
              <p className="text-sm text-red-500">{errors.author.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Sua Avaliação</Label>
            <div className="flex items-center space-x-4">
              <StarRating
                rating={currentRating}
                size="lg"
                interactive
                onRatingChange={handleRatingChange}
              />
              <span className="text-lg font-semibold text-slate-700">
                {currentRating} estrela{currentRating !== 1 ? 's' : ''}
              </span>
            </div>
            <input
              type="hidden"
              {...register('rating', { valueAsNumber: true })}
            />
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comentário</Label>
            <Textarea
              id="comment"
              placeholder="Compartilhe sua experiência com este produto..."
              rows={4}
              {...register('comment')}
              className={errors.comment ? 'border-red-500' : ''}
            />
            {errors.comment && (
              <p className="text-sm text-red-500">{errors.comment.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{submitLabel}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default ReviewForm
