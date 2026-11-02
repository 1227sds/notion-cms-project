import { cache } from 'react'
import { isFullPage } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client'
import {
  getDataSourceId,
  isNotionConfigured,
  n2m,
  notion,
} from '@/lib/notion/client'
import type { Recipe, RecipeDetail } from '@/lib/notion/types'

type Property = PageObjectResponse['properties'][string]

const PUBLISHED_STATUS = '발행됨'

function getTitle(prop?: Property): string {
  return prop?.type === 'title'
    ? prop.title.map(t => t.plain_text).join('')
    : ''
}

function getText(prop?: Property): string {
  return prop?.type === 'rich_text'
    ? prop.rich_text.map(t => t.plain_text).join('')
    : ''
}

function getSelect(prop?: Property): string | null {
  return prop?.type === 'select' ? (prop.select?.name ?? null) : null
}

function getTags(prop?: Property): string[] {
  return prop?.type === 'multi_select' ? prop.multi_select.map(o => o.name) : []
}

function getNumber(prop?: Property): number | null {
  return prop?.type === 'number' ? prop.number : null
}

function getDate(prop?: Property): string | null {
  return prop?.type === 'date' ? (prop.date?.start ?? null) : null
}

function getCover(page: PageObjectResponse): string | null {
  const files = page.properties.Cover
  if (files?.type === 'files' && files.files[0]) {
    const file = files.files[0]
    return file.type === 'file' ? file.file.url : file.external.url
  }
  if (page.cover) {
    return page.cover.type === 'file'
      ? page.cover.file.url
      : page.cover.external.url
  }
  return null
}

function toRecipe(page: PageObjectResponse): Recipe {
  const { properties } = page
  return {
    id: page.id,
    slug: getText(properties.Slug).trim() || page.id.replaceAll('-', ''),
    title: getTitle(properties.Title) || '제목 없음',
    category: getSelect(properties.Category),
    tags: getTags(properties.Tags),
    publishedAt: getDate(properties.Published),
    cookTime: getNumber(properties.CookTime),
    difficulty: getSelect(properties.Difficulty),
    cover: getCover(page),
  }
}

/** 발행된 레시피 전체를 최신순으로 가져온다. (요청 내 중복 호출은 dedupe) */
export const getRecipes = cache(async (): Promise<Recipe[]> => {
  if (!isNotionConfigured()) return []

  const data_source_id = await getDataSourceId()
  const recipes: Recipe[] = []
  let cursor: string | undefined

  do {
    const res = await notion.dataSources.query({
      data_source_id,
      filter: { property: 'Status', select: { equals: PUBLISHED_STATUS } },
      sorts: [{ property: 'Published', direction: 'descending' }],
      start_cursor: cursor,
      page_size: 100,
    })
    for (const page of res.results) {
      if (isFullPage(page)) recipes.push(toRecipe(page))
    }
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined
  } while (cursor)

  return recipes
})

export async function getRecipesByCategory(
  category: string
): Promise<Recipe[]> {
  const recipes = await getRecipes()
  return recipes.filter(recipe => recipe.category === category)
}

export async function getCategories(): Promise<string[]> {
  const recipes = await getRecipes()
  return [
    ...new Set(
      recipes.map(r => r.category).filter((c): c is string => c !== null)
    ),
  ]
}

export const getRecipeBySlug = cache(
  async (slug: string): Promise<RecipeDetail | null> => {
    const recipes = await getRecipes()
    const recipe = recipes.find(r => r.slug === slug)
    if (!recipe) return null

    const blocks = await n2m.pageToMarkdown(recipe.id)
    const content = n2m.toMarkdownString(blocks).parent ?? ''
    return { ...recipe, content }
  }
)
