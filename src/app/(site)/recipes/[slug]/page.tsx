import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { RecipeContent } from '@/components/recipes/recipe-content'
import { Badge } from '@/components/ui/badge'
import { getRecipeBySlug, getRecipes } from '@/lib/notion/recipes'

export const revalidate = 1800

interface RecipePageProps {
  params: Promise<{ slug: string }>
}

function decodeParam(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export async function generateStaticParams() {
  const recipes = await getRecipes()
  return recipes.map(recipe => ({ slug: recipe.slug }))
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const recipe = await getRecipeBySlug(decodeParam((await params).slug))
  if (!recipe) return { title: '레시피를 찾을 수 없습니다' }
  return {
    title: recipe.title,
    description: `${recipe.category ?? '레시피'} · ${recipe.title}`,
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeBySlug(decodeParam((await params).slug))
  if (!recipe) notFound()

  return (
    <Container size="sm" className="space-y-8 py-10">
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        목록으로
      </Link>

      <article className="space-y-8">
        {recipe.cover && (
          <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={recipe.cover}
              alt={recipe.title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {recipe.title}
          </h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
            {recipe.category && (
              <Link href={`/category/${encodeURIComponent(recipe.category)}`}>
                <Badge>{recipe.category}</Badge>
              </Link>
            )}
            {recipe.difficulty && (
              <Badge variant="outline">{recipe.difficulty}</Badge>
            )}
            {recipe.cookTime !== null && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden />
                {recipe.cookTime}분
              </span>
            )}
            {recipe.publishedAt && (
              <span className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" aria-hidden />
                {new Date(recipe.publishedAt).toLocaleDateString('ko-KR')}
              </span>
            )}
          </div>
          {recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <RecipeContent content={recipe.content} />
      </article>
    </Container>
  )
}
