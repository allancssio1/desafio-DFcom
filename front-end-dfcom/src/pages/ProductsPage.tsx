import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Search, Filter } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import LoadingSpinner from '@/components/common/Loading'
import ErrorMessage from '@/components/common/ErrorMensage'
import { useProducts } from '@/hooks/useProducts'

const ProductsPage = () => {
  const { data: products = [], isLoading, error, refetch } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  if (isLoading) {
    return <LoadingSpinner text="Carregando produtos..." />
  }

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar produtos"
        message={error.message}
        onRetry={() => refetch()}
      />
    )
  }

  // Get unique categories
  const categories = [...new Set(products.map((p) => p.category))]

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        categoryFilter === 'all' || product.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'date':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        default:
          return 0
      }
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Produtos</h1>
          <p className="text-slate-600 mt-1">
            {filteredProducts.length} produto
            {filteredProducts.length !== 1 ? 's' : ''} encontrado
            {filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <Button asChild className="flex items-center space-x-2">
          <Link to="/products/create">
            <Plus className="h-4 w-4" />
            <span>Novo Produto</span>
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nome</SelectItem>
              <SelectItem value="price-asc">Menor preço</SelectItem>
              <SelectItem value="price-desc">Maior preço</SelectItem>
              <SelectItem value="date">Mais recente</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-slate-600 flex items-center">
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm('')}
                className="text-xs"
              >
                Limpar busca
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} showActions />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-slate-100 p-8 rounded-xl">
            <h3 className="text-xl font-semibold text-slate-700 mb-2">
              {searchTerm || categoryFilter !== 'all'
                ? 'Nenhum produto encontrado'
                : 'Nenhum produto cadastrado'}
            </h3>
            <p className="text-slate-600 mb-6">
              {searchTerm || categoryFilter !== 'all'
                ? 'Tente ajustar os filtros de busca'
                : 'Comece adicionando seu primeiro produto'}
            </p>
            <Button asChild>
              <Link to="/products/create">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Produto
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsPage
