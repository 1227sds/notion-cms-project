import { Container } from '@/components/layout/container'
import { CategoryFilter } from '@/components/recipes/category-filter'
import { NotionSetupNotice } from '@/components/recipes/notion-setup-notice'
import { RecipeSearch } from '@/components/recipes/recipe-search'
import { isNotionConfigured } from '@/lib/notion/client'
import { getCategories, getRecipes } from '@/lib/notion/recipes'

// Notion 파일 URL이 약 1시간 후 만료되므로 그보다 짧게 재검증한다.
export const revalidate = 1800

export default async function HomePage() {
  const [recipes, categories] = await Promise.all([
    getRecipes(),
    getCategories(),
  ])

  return (
    <Container className="space-y-8 py-10">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">최근 레시피</h1>
        <p className="text-muted-foreground">
          Notion에 적은 레시피가 자동으로 올라옵니다.
        </p>
      </section>

      {!isNotionConfigured() && <NotionSetupNotice />}
      <CategoryFilter categories={categories} />
      <RecipeSearch recipes={recipes} />
    </Container>
  )
}
