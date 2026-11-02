'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RecipeGrid } from '@/components/recipes/recipe-grid'
import type { Recipe } from '@/lib/notion/types'

interface RecipeSearchProps {
  recipes: Recipe[]
}

function normalize(value: string): string {
  return value.normalize('NFC').toLowerCase()
}

/** 공백으로 나눈 모든 검색어가 제목·카테고리·태그 중 어딘가에 포함되면 일치. */
function filterRecipes(recipes: Recipe[], query: string): Recipe[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  if (terms.length === 0) return recipes

  return recipes.filter(recipe => {
    const haystack = normalize(
      [recipe.title, recipe.category ?? '', ...recipe.tags].join(' ')
    )
    return terms.every(term => haystack.includes(term))
  })
}

export function RecipeSearch({ recipes }: RecipeSearchProps) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(
    () => filterRecipes(recipes, query),
    [recipes, query]
  )
  const isSearching = query.trim().length > 0

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
          aria-hidden
        />
        <Input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="제목, 카테고리, 태그로 검색"
          aria-label="레시피 검색"
          className="pr-10 pl-9"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2"
            onClick={() => setQuery('')}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">검색어 지우기</span>
          </Button>
        )}
      </div>

      {isSearching && (
        <p className="text-muted-foreground text-sm" aria-live="polite">
          {filtered.length}개의 레시피
        </p>
      )}

      {isSearching && filtered.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center">
          &lsquo;{query.trim()}&rsquo;에 대한 검색 결과가 없습니다.
        </p>
      ) : (
        <RecipeGrid recipes={filtered} />
      )}
    </div>
  )
}
