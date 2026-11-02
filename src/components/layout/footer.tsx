import { Container } from './container'

export function Footer() {
  return (
    <footer className="border-t">
      <Container>
        <div className="py-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              개인 레시피 북 · Notion으로 만드는 나만의 레시피
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
