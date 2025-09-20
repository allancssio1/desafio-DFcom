export interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  createdAt: string
  updatedAt: string
}

export interface CreateProductDto {
  name: string
  description: string
  price: number
  category: string
}

export interface UpdateProductDto {
  name?: string
  description?: string
  price?: number
  category?: string
}

export interface ProductStats {
  averageRating: number
  totalReviews: number
}
