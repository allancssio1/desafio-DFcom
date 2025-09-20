import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { productSchema, type ProductFormData } from '@/lib/validation'
import type { Product } from '@/types/product'

interface ProductFormProps {
  product?: Product
  onSubmit: (data: ProductFormData) => void
  isLoading?: boolean
  submitLabel?: string
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  isLoading = false,
  submitLabel = 'Salvar Produto',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
        }
      : undefined,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? 'Editar Produto' : 'Novo Produto'}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ex: iPhone 15 Pro"
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="category"
                type="text"
                placeholder="Ex: Eletrônicos"
                {...register('category')}
                className={errors.category ? 'border-red-500' : ''}
              />
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Preço (R$)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register('price', { valueAsNumber: true })}
              className={errors.price ? 'border-red-500' : ''}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o produto..."
              rows={4}
              {...register('description')}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
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

export default ProductForm
