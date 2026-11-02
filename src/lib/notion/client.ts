import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { env } from '@/lib/env'

export function isNotionConfigured(): boolean {
  return Boolean(env.NOTION_API_KEY && env.NOTION_DATABASE_ID)
}

export const notion = new Client({ auth: env.NOTION_API_KEY })

// notion-to-md는 자체 @notionhq/client(v2)에 의존하므로 타입만 맞춰 준다.
export const n2m = new NotionToMarkdown({
  notionClient: notion as unknown as ConstructorParameters<
    typeof NotionToMarkdown
  >[0]['notionClient'],
})

let dataSourceIdPromise: Promise<string> | undefined

/**
 * @notionhq/client v5는 database가 아닌 data source를 쿼리한다.
 * DB ID로 data source ID를 조회해 캐시한다.
 */
export function getDataSourceId(): Promise<string> {
  dataSourceIdPromise ??= notion.databases
    .retrieve({ database_id: env.NOTION_DATABASE_ID! })
    .then(db => {
      const id = 'data_sources' in db ? db.data_sources[0]?.id : undefined
      if (!id) throw new Error('Notion data source를 찾을 수 없습니다.')
      return id
    })
    .catch(error => {
      dataSourceIdPromise = undefined
      throw error
    })
  return dataSourceIdPromise
}
