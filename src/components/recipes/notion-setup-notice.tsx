import { TriangleAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function NotionSetupNotice() {
  return (
    <Alert>
      <TriangleAlert />
      <AlertTitle>Notion 연동이 필요합니다</AlertTitle>
      <AlertDescription>
        <code>.env.local</code>에 <code>NOTION_API_KEY</code>와{' '}
        <code>NOTION_DATABASE_ID</code>를 입력하고 개발 서버를 다시 시작하세요.
      </AlertDescription>
    </Alert>
  )
}
