import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/layout/Header'
import HomePage from '@/pages/HomePage'
import ProductsPage from '@/pages/ProductsPage'
import ProductDetailsPage from '@/pages/ProductDetailsPage'
import CreateProductPage from '@/pages/CreateProductPage'
import EditProductPage from '@/pages/EditProductPage'
import './App.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              <Route path="/products/create" element={<CreateProductPage />} />
              <Route path="/products/:id/edit" element={<EditProductPage />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
