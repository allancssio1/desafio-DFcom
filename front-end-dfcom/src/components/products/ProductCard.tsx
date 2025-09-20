import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Edit2, Trash2 } from 'lucide-react'
import StarRating from '@/components/common/StarRating'
import { useProductStats, useDeleteProduct } from '@/hooks/useProducts'
import type { Product } from '@/types/product'
import { formatCurrency } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  onEdit?: (product: Product) => void
  showActions?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  showActions = false,
}) => {
  const { data: stats } = useProductStats(product._id)
  const deleteProduct = useDeleteProduct()

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct.mutate(product._id)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </CardTitle>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {product.category}
          </Badge>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="text-2xl font-bold text-slate-900">
            {formatCurrency(product.price)}
          </div>
          {stats && (
            <div className="flex items-center space-x-2">
              <StarRating rating={stats.averageRating} size="sm" />
              <span className="text-sm text-slate-600">
                ({stats.totalReviews})
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-slate-600 text-sm line-clamp-3">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between w-full">
          <Button asChild variant="outline" size="sm">
            <Link
              to={`/products/${product._id}`}
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Ver Detalhes</span>
            </Link>
          </Button>

          {showActions && (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit?.(product)}
                className="flex items-center space-x-2"
              >
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={deleteProduct.isLoading}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Excluir</span>
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
