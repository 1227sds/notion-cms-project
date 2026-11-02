import Image from 'next/image'
import Link from 'next/link'
import { ChefHat, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Recipe } from '@/lib/notion/types'

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="focus-visible:ring-ring group rounded-xl outline-none focus-visible:ring-2"
    >
      <Card className="h-full overflow-hidden pt-0 transition-shadow group-hover:shadow-lg">
        <div className="bg-muted relative aspect-video w-full overflow-hidden">
          {recipe.cover ? (
            <Image
              src={recipe.cover}
              alt={recipe.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="text-muted-foreground flex h-full items-center justify-center">
              <ChefHat className="h-10 w-10" aria-hidden />
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2 text-lg">{recipe.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          {recipe.category && <Badge>{recipe.category}</Badge>}
          {recipe.difficulty && (
            <Badge variant="outline">{recipe.difficulty}</Badge>
          )}
          {recipe.cookTime !== null && (
            <span className="text-muted-foreground ml-auto flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4" aria-hidden />
              {recipe.cookTime}분
            </span>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
