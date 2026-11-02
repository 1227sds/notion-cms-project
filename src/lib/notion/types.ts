export interface Recipe {
  id: string
  slug: string
  title: string
  category: string | null
  tags: string[]
  publishedAt: string | null
  /** 조리시간(분) */
  cookTime: number | null
  difficulty: string | null
  cover: string | null
}

export interface RecipeDetail extends Recipe {
  /** 본문 (마크다운) */
  content: string
}
