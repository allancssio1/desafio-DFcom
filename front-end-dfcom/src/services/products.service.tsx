import { api } from '@/lib/api'
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
  ProductStats,
} from '@/types/product'

export const productsService = {
  async getProducts(): Promise<Product[]> {
    const { data } = await api.get<Product[]>('/products')
    return data
  },

  async getProduct(id: string): Promise<Product> {
    const { data } = await api.get<Product>(`/products/${id}`)
    return data
  },

  async createProduct(productData: CreateProductDto): Promise<Product> {
    const { data } = await api.post<Product>('/products', productData)
    return data
  },

  async updateProduct(
    id: string,
    productData: UpdateProductDto,
  ): Promise<Product> {
    const { data } = await api.patch<Product>(`/products/${id}`, productData)
    return data
  },

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`)
  },

  async getProductStats(id: string): Promise<ProductStats> {
    const { data } = await api.get<ProductStats>(
      `/products/${id}/average-rating`,
    )
    return data
  },
}
