export interface Review {
  _id: string
  productId: string
  author: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
  productDetails?: {
    name: string
    price: number
    category: string
  }
}

export interface CreateReviewDto {
  productId: string
  author: string
  rating: number
  comment: string
}

export interface UpdateReviewDto {
  author?: string
  rating?: number
  comment?: string
}

export interface ReviewStats {
  totalReviews: number
  averageRating: number
  ratingDistribution: Record<string, number>
}
