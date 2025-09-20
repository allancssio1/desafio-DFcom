import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // server: {
  //   proxy: {
  //     // Redireciona requisições que começam com /api para o seu back-end
  //     '/api': {
  //       // Coloque aqui o endereço do seu servidor back-end
  //       target: 'http://localhost:3333',
  //       // Necessário para o back-end receber o host correto
  //       changeOrigin: true,
  //       // Opcional: remove o /api do início da URL antes de enviar para o back-end
  //       // Use isso se suas rotas no back-end não tiverem o prefixo /api
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
})
