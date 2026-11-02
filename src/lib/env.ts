import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  VERCEL_URL: z.string().optional(),
  VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  // Notion 키가 없어도 빌드는 되도록 optional (미설정 시 안내 화면 표시)
  NOTION_API_KEY: z.string().optional(),
  NOTION_DATABASE_ID: z.string().optional(),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || undefined,
  NOTION_API_KEY: process.env.NOTION_API_KEY || undefined,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID || undefined,
})

export type Env = z.infer<typeof envSchema>
