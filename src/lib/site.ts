import { env } from '@/lib/env'

/**
 * 사이트의 기준 URL.
 * 우선순위: NEXT_PUBLIC_APP_URL → Vercel 프로덕션 도메인 → Vercel 배포 URL → 로컬
 */
export function getSiteUrl(): URL {
  if (env.NEXT_PUBLIC_APP_URL) return new URL(env.NEXT_PUBLIC_APP_URL)
  const vercelHost = env.VERCEL_PROJECT_PRODUCTION_URL ?? env.VERCEL_URL
  if (vercelHost) return new URL(`https://${vercelHost}`)
  return new URL('http://localhost:3000')
}
