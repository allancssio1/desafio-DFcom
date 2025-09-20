import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Product } from '@/types/product'

interface ProductState {
  products: Product[]
  selectedProduct: Product | null
  loading: boolean
  error: string | null
}

interface ProductActions {
  setProducts: (products: Product[]) => void
  setSelectedProduct: (product: Product | null) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Product) => void
  removeProduct: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

type ProductStore = ProductState & ProductActions

export const useProductStore = create<ProductStore>()(
  devtools(
    (set) => ({
      // State
      products: [],
      selectedProduct: null,
      loading: false,
      error: null,

      // Actions
      setProducts: (products) => set({ products }),

      setSelectedProduct: (product) => set({ selectedProduct: product }),

      addProduct: (product) =>
        set((state) => ({
          products: [product, ...state.products],
        })),

      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((p) =>
            p._id === id ? updatedProduct : p,
          ),
          selectedProduct:
            state.selectedProduct?._id === id
              ? updatedProduct
              : state.selectedProduct,
        })),

      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p._id !== id),
          selectedProduct:
            state.selectedProduct?._id === id ? null : state.selectedProduct,
        })),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),
    }),
    { name: 'product-store' },
  ),
)
