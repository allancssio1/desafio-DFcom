import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  TrendingUp,
  ShoppingBag,
  Star,
  Users,
  Plus,
  ArrowRight,
} from 'lucide-react'
import LoadingSpinner from '@/components/common/Loading'
import ErrorMessage from '@/components/common/ErrorMensage'
import StarRating from '@/components/common/StarRating'
import { useProducts } from '@/hooks/useProducts'
import { useRecentReviews } from '@/hooks/useReviews'
import { formatCurrency, formatDate } from '@/lib/utils'

const HomePage = () => {
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useProducts()
  const { data: recentReviews = [], isLoading: reviewsLoading } =
    useRecentReviews(6)

  if (productsLoading) {
    return <LoadingSpinner text="Carregando dashboard..." />
  }

  if (productsError) {
    return (
      <ErrorMessage
        title="Erro ao carregar dashboard"
        message={productsError.message}
      />
    )
  }

  const stats = {
    totalProducts: products.length,
    totalCategories: [...new Set(products.map((p: any) => p.category))].length,
    averagePrice:
      products.length > 0
        ? products.reduce((sum, p) => sum + p.price, 0) / products.length
        : 0,
    totalReviews: recentReviews.length,
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-200/50">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Bem-vindo ao ProductHub
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Gerencie seus produtos e acompanhe as avaliações dos clientes em um só
          lugar
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg" className="flex items-center space-x-2">
            <Link to="/products/create">
              <Plus className="h-5 w-5" />
              <span>Adicionar Produto</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            size="lg"
            className="flex items-center space-x-2"
          >
            <Link to="/products">
              <ShoppingBag className="h-5 w-5" />
              <span>Ver Produtos</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Produtos
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-slate-600">produtos cadastrados</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <p className="text-xs text-slate-600">categorias diferentes</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preço Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.averagePrice)}
            </div>
            <p className="text-xs text-slate-600">valor médio dos produtos</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliações</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReviews}</div>
            <p className="text-xs text-slate-600">avaliações recentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
                <span>Produtos Recentes</span>
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/products" className="flex items-center space-x-2">
                  <span>Ver todos</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
                >
                  <div className="flex-1">
                    <Link
                      to={`/products/${product._id}`}
                      className="font-medium text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                      <span className="text-sm text-slate-600">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">
                    Nenhum produto cadastrado ainda
                  </p>
                  <Button asChild className="mt-4">
                    <Link to="/products/create">Criar primeiro produto</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <span>Avaliações Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviewsLoading ? (
                <LoadingSpinner size="sm" text="Carregando avaliações..." />
              ) : (
                recentReviews.slice(0, 5).map((review) => (
                  <div
                    key={review._id}
                    className="p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="bg-blue-100 p-1 rounded-full">
                          <Users className="h-3 w-3 text-blue-600" />
                        </div>
                        <span className="font-medium text-sm text-slate-900">
                          {review.author}
                        </span>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                      {review.comment}
                    </p>

                    {review.productDetails && (
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {review.productDetails.name}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}

              {!reviewsLoading && recentReviews.length === 0 && (
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Nenhuma avaliação ainda</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HomePage
