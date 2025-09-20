import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productsService } from '@/services/products.service'
import { useProductStore } from '@/stores/useProductStore'
import { toast } from 'sonner'
import type { UpdateProductDto } from '@/types/product'

export const useProducts = () => {
  const { setError, clearError } = useProductStore()

  return useQuery({
    queryKey: ['products'],
    queryFn: productsService.getProducts,
    throwOnError: (error: Error) => {
      if (error) {
        setError(error.message)
        toast('Erro ao carregar produtos')
        return true
      } else {
        clearError()
        return false
      }
    },
  })
}

export const useProduct = (id: string) => {
  const { setError, clearError } = useProductStore()

  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productsService.getProduct(id),
    enabled: !!id,
    throwOnError: (error: Error) => {
      if (error) {
        setError(error.message)
        toast('Erro ao carregar produtos')
        return true
      } else {
        clearError()
        return false
      }
    },
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  const { addProduct } = useProductStore()

  return useMutation({
    mutationFn: productsService.createProduct,
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries(['products'])
      addProduct(newProduct)
      toast('Produto criado com sucesso!')
    },
    throwOnError: (error: Error) => {
      toast('Erro ao carregar produtos')
      return true
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  const { updateProduct } = useProductStore()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDto }) =>
      productsService.updateProduct(id, data),
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries(['products'])
      queryClient.invalidateQueries(['products', updatedProduct._id])
      updateProduct(updatedProduct._id, updatedProduct)
      toast('Produto atualizado com sucesso!')
    },
    throwOnError: (error: Error) => {
      toast('Erro ao carregar produtos')
      return true
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  const { removeProduct } = useProductStore()

  return useMutation({
    mutationFn: productsService.deleteProduct,
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries(['products'])
      removeProduct(productId)
      toast('Produto excluído com sucesso!')
    },
    onError: (error: Error) => {
      toast('Erro ao excluir produto')
    },
  })
}

export const useProductStats = (id: string) => {
  return useQuery({
    queryKey: ['products', id, 'stats'],
    queryFn: () => productsService.getProductStats(id),
    enabled: !!id,
  })
}
