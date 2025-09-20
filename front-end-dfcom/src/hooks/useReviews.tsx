import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { reviewsService } from '@/services/reviews.service'
import { toast } from 'sonner'
import type { UpdateReviewDto } from '@/types/review'

export const useReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: reviewsService.getReviews,
    throwOnError: (error: Error) => {
      if (error) {
        toast('Erro ao carregar produtos')
        return true
      } else {
        return false
      }
    },
  })
}

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ['reviews', 'product', productId],
    queryFn: () => reviewsService.getReviewsByProduct(productId),
    enabled: !!productId,
    throwOnError: (error: Error) => {
      if (error) {
        toast('Erro ao carregar produtos')
        return true
      } else {
        return false
      }
    },
  })
}

export const useTopProductReviews = (productId: string, limit = 5) => {
  return useQuery({
    queryKey: ['reviews', 'product', productId, 'top', limit],
    queryFn: () => reviewsService.getTopReviewsByProduct(productId, limit),
    enabled: !!productId,
  })
}

export const useRecentReviews = (limit = 10) => {
  return useQuery({
    queryKey: ['reviews', 'recent', limit],
    queryFn: () => reviewsService.getRecentReviews(limit),
  })
}

export const useProductReviewStats = (productId: string) => {
  return useQuery({
    queryKey: ['reviews', 'product', productId, 'stats'],
    queryFn: () => reviewsService.getProductReviewStats(productId),
    enabled: !!productId,
  })
}

export const useCreateReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reviewsService.createReview,
    onSuccess: (newReview) => {
      queryClient.invalidateQueries(['reviews'])
      queryClient.invalidateQueries(['reviews', 'product', newReview.productId])
      queryClient.invalidateQueries([
        'reviews',
        'product',
        newReview.productId,
        'stats',
      ])
      queryClient.invalidateQueries(['products', newReview.productId, 'stats'])
      toast('Avaliação criada com sucesso!')
    },
    onError: (error: Error) => {
      toast('Erro ao criar avaliação')
    },
  })
}

export const useUpdateReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateReviewDto }) =>
      reviewsService.updateReview(id, data),
    onSuccess: (updatedReview) => {
      queryClient.invalidateQueries(['reviews'])
      queryClient.invalidateQueries([
        'reviews',
        'product',
        updatedReview.productId,
      ])
      queryClient.invalidateQueries([
        'reviews',
        'product',
        updatedReview.productId,
        'stats',
      ])
      toast('Avaliação atualizada com sucesso!')
    },
    onError: (error: Error) => {
      toast('Erro ao atualizar avaliação')
    },
  })
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reviewsService.deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews'])
      toast('Avaliação excluída com sucesso!')
    },
    onError: (error: Error) => {
      toast('Erro ao excluir avaliação')
    },
  })
}
