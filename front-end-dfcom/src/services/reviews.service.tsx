import { api } from '@/lib/api'
import type {
  Review,
  CreateReviewDto,
  UpdateReviewDto,
  ReviewStats,
} from '@/types/review'

export const reviewsService = {
  async getReviews(): Promise<Review[]> {
    const { data } = await api.get<Review[]>('/reviews')
    return data
  },

  async getReviewsByProduct(productId: string): Promise<Review[]> {
    const { data } = await api.get<Review[]>(`/reviews/product/${productId}`)
    return data
  },

  async getTopReviewsByProduct(
    productId: string,
    limit = 5,
  ): Promise<Review[]> {
    const { data } = await api.get<Review[]>(
      `/reviews/product/${productId}?top=true&limit=${limit}`,
    )
    return data
  },

  async getRecentReviews(limit = 10): Promise<Review[]> {
    const { data } = await api.get<Review[]>(
      `/reviews?recent=true&limit=${limit}`,
    )
    return data
  },

  async getProductReviewStats(productId: string): Promise<ReviewStats> {
    const { data } = await api.get<ReviewStats>(
      `/reviews/product/${productId}/stats`,
    )
    return data
  },

  async getReview(id: string): Promise<Review> {
    const { data } = await api.get<Review>(`/reviews/${id}`)
    return data
  },

  async createReview(reviewData: CreateReviewDto): Promise<Review> {
    const { data } = await api.post<Review>('/reviews', reviewData)
    return data
  },

  async updateReview(id: string, reviewData: UpdateReviewDto): Promise<Review> {
    const { data } = await api.patch<Review>(`/reviews/${id}`, reviewData)
    return data
  },

  async deleteReview(id: string): Promise<void> {
    await api.delete<void>(`/reviews/${id}`)
  },
}
