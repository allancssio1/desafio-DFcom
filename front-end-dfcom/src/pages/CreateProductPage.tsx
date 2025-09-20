import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import ProductForm from '@/components/products/ProductForm'
import { useCreateProduct } from '@/hooks/useProducts'
import type { ProductFormData } from '@/lib/validation'

const CreateProductPage = () => {
  const navigate = useNavigate()
  const createProduct = useCreateProduct()

  const handleSubmit = (data: ProductFormData) => {
    createProduct.mutate(data, {
      onSuccess: (newProduct) => {
        navigate(`/products/${newProduct._id}`)
      },
    })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="flex items-center space-x-2">
          <Link to="/products">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar aos Produtos</span>
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-slate-900">Novo Produto</h1>
        <p className="text-slate-600 mt-1">
          Adicione um novo produto ao seu catálogo
        </p>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        isLoading={createProduct.isPending}
        submitLabel="Criar Produto"
      />
    </div>
  )
}

export default CreateProductPage
