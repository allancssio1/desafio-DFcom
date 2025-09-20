import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Plus, Home } from 'lucide-react'

const Header = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors"
          >
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <span>ProductHub</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              asChild
              className="flex items-center space-x-2"
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </Button>

            <Button
              variant={isActive('/products') ? 'default' : 'ghost'}
              asChild
              className="flex items-center space-x-2"
            >
              <Link to="/products">
                <ShoppingBag className="h-4 w-4" />
                <span>Produtos</span>
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="flex items-center space-x-2 ml-4"
            >
              <Link to="/products/create">
                <Plus className="h-4 w-4" />
                <span>Novo Produto</span>
              </Link>
            </Button>
          </nav>

          {/* Mobile navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <Button size="sm" variant="ghost" asChild>
              <Link to="/">
                <Home className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="sm" variant="ghost" asChild>
              <Link to="/products">
                <ShoppingBag className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link to="/products/create">
                <Plus className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
