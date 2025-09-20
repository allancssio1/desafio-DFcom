import { z } from 'zod'

const envSchema = z.object({
  BASE_URL: z.string(),
})

export const env = envSchema.parse(import.meta.env)

export type Env = z.infer<typeof envSchema>
