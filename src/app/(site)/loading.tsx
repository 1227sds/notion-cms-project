import { Container } from '@/components/layout/container'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <Container className="space-y-8 py-10">
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-72" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    </Container>
  )
}
