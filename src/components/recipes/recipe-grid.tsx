import { RecipeCard } from '@/components/recipes/recipe-card'
import type { Recipe } from '@/lib/notion/types'

interface RecipeGridProps {
  recipes: Recipe[]
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <p className="text-muted-foreground py-16 text-center">
        아직 등록된 레시피가 없습니다.
      </p>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
