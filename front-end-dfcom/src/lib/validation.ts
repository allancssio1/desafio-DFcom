import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
  price: z.number().min(0.01, 'Preço deve ser maior que zero'),
  category: z
    .string()
    .min(1, 'Categoria é obrigatória')
    .max(50, 'Categoria deve ter no máximo 50 caracteres'),
})

export const reviewSchema = z.object({
  author: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  rating: z
    .number()
    .min(1, 'Avaliação mínima é 1')
    .max(5, 'Avaliação máxima é 5'),
  comment: z
    .string()
    .min(1, 'Comentário é obrigatório')
    .max(1000, 'Comentário deve ter no máximo 1000 caracteres'),
})

export type ProductFormData = z.infer<typeof productSchema>
export type ReviewFormData = z.infer<typeof reviewSchema>
