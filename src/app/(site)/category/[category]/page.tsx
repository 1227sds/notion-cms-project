import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/container'
import { CategoryFilter } from '@/components/recipes/category-filter'
import { RecipeGrid } from '@/components/recipes/recipe-grid'
import { getCategories, getRecipesByCategory } from '@/lib/notion/recipes'

export const revalidate = 1800

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

function decodeParam(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map(category => ({ category }))
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const category = decodeParam((await params).category)
  return { title: `${category} 레시피` }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeParam((await params).category)
  const [recipes, categories] = await Promise.all([
    getRecipesByCategory(category),
    getCategories(),
  ])

  if (recipes.length === 0) notFound()

  return (
    <Container className="space-y-8 py-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{category}</h1>
        <p className="text-muted-foreground">{recipes.length}개의 레시피</p>
      </section>

      <CategoryFilter categories={categories} active={category} />
      <RecipeGrid recipes={recipes} />
    </Container>
  )
}
