import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CategoryFilterProps {
  categories: string[]
  /** 현재 선택된 카테고리 (없으면 "전체") */
  active?: string
}

export function CategoryFilter({ categories, active }: CategoryFilterProps) {
  if (categories.length === 0) return null

  return (
    <nav aria-label="카테고리" className="flex flex-wrap gap-2">
      <Button
        asChild
        size="sm"
        variant={active ? 'outline' : 'default'}
        className="rounded-full"
      >
        <Link href="/">전체</Link>
      </Button>
      {categories.map(category => (
        <Button
          key={category}
          asChild
          size="sm"
          variant={category === active ? 'default' : 'outline'}
          className="rounded-full"
        >
          <Link href={`/category/${encodeURIComponent(category)}`}>
            {category}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
