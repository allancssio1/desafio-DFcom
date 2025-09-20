import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import ProductForm from '@/components/products/ProductForm'
import LoadingSpinner from '@/components/common/Loading'
import ErrorMessage from '@/components/common/ErrorMensage'
import { useProduct, useUpdateProduct } from '@/hooks/useProducts'
import type { ProductFormData } from '@/lib/validation'

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: product, isLoading, error } = useProduct(id!)
  const updateProduct = useUpdateProduct()

  if (isLoading) {
    return <LoadingSpinner text="Carregando produto..." />
  }

  if (error || !product) {
    return (
      <ErrorMessage
        title="Produto não encontrado"
        message={error?.message || 'O produto solicitado não existe.'}
      />
    )
  }

  const handleSubmit = (data: ProductFormData) => {
    updateProduct.mutate(
      {
        id: id!,
        data,
      },
      {
        onSuccess: () => {
          navigate(`/products/${id}`)
        },
      },
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="flex items-center space-x-2">
          <Link to={`/products/${id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Produto</span>
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-slate-900">Editar Produto</h1>
        <p className="text-slate-600 mt-1">
          Atualize as informações do produto: {product.name}
        </p>
      </div>

      <ProductForm
        product={product}
        onSubmit={handleSubmit}
        isLoading={updateProduct.isPending}
        submitLabel="Atualizar Produto"
      />
    </div>
  )
}

export default EditProductPage
