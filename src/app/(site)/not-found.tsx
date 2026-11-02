import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Container
      size="sm"
      className="flex flex-col items-center gap-4 py-24 text-center"
    >
      <h1 className="text-3xl font-bold">레시피를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground">
        주소가 잘못되었거나 아직 발행되지 않은 레시피입니다.
      </p>
      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </Container>
  )
}
