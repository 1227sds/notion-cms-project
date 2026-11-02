import type { MetadataRoute } from 'next'
import { getCategories, getRecipes } from '@/lib/notion/recipes'
import { getSiteUrl } from '@/lib/site'

export const revalidate = 1800

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()
  const [recipes, categories] = await Promise.all([
    getRecipes(),
    getCategories(),
  ])

  return [
    { url: new URL('/', base).toString(), changeFrequency: 'daily' },
    ...categories.map(category => ({
      url: new URL(
        `/category/${encodeURIComponent(category)}`,
        base
      ).toString(),
      changeFrequency: 'weekly' as const,
    })),
    ...recipes.map(recipe => ({
      url: new URL(`/recipes/${recipe.slug}`, base).toString(),
      lastModified: recipe.publishedAt ?? undefined,
      changeFrequency: 'monthly' as const,
    })),
  ]
}
