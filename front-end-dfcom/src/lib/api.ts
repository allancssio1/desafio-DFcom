import axios from 'axios'
import { env } from './env'

export const api = axios.create({
  baseURL: env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// // Request interceptor for logging
// api.interceptors.request.use(
//   (config) => {
//     console.log(
//       `Making ${config.method?.toUpperCase()} request to ${config.url}`,
//     )
//     return config
//   },
//   (error) => {
//     console.error('Request error:', error)
//     return Promise.reject(error)
//   },
// )

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response?.data || error.message)

//     if (error.response?.status === 404) {
//       throw new Error('Recurso não encontrado')
//     }

//     if (error.response?.status === 400) {
//       throw new Error(error.response.data?.message || 'Dados inválidos')
//     }

//     if (error.response?.status >= 500) {
//       throw new Error('Erro interno do servidor. Tente novamente mais tarde.')
//     }

//     throw new Error(
//       error.response?.data?.message || 'Erro na comunicação com o servidor',
//     )
//   },
// )
