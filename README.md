# 개인 레시피 북

Notion 데이터베이스를 CMS로 사용하는 레시피 사이트입니다. Notion에 레시피를 적으면 목록, 상세, 카테고리 페이지가 자동으로 만들어지고, 30분마다 갱신됩니다.

- Next.js (App Router) · React · TypeScript
- Notion API (`@notionhq/client`) · `notion-to-md` · `react-markdown`
- Tailwind CSS · shadcn/ui · Lucide React

자세한 요구사항은 [`docs/PRD.md`](docs/PRD.md), 진행 상황은 [`docs/ROADMAP.md`](docs/ROADMAP.md)를 참고하세요.

## 로컬 실행

```bash
npm install
cp .env.example .env.local   # 값을 채워 넣기
npm run dev
```

| 환경변수              | 필수 | 설명                                                          |
| --------------------- | ---- | ------------------------------------------------------------- |
| `NOTION_API_KEY`      | O    | Notion Integration 시크릿                                     |
| `NOTION_DATABASE_ID`  | O    | 레시피 데이터베이스 ID                                        |
| `NEXT_PUBLIC_APP_URL` | 선택 | 커스텀 도메인 (sitemap, 메타데이터용). 없으면 Vercel URL 사용 |

> 두 필수 값이 비어 있어도 빌드는 되지만, 홈에 "Notion 연동이 필요합니다" 안내만 표시됩니다.

## Notion 설정

1. https://www.notion.so/profile/integrations 에서 Integration을 만들고 시크릿을 복사합니다.
2. 레시피 DB 페이지에서 `···` → Connections → 만든 Integration을 연결합니다.
3. DB 속성은 [`docs/PRD.md`](docs/PRD.md)의 표와 이름·타입이 같아야 합니다. (`Status`가 `발행됨`인 글만 노출)

## Vercel 배포

1. 코드를 GitHub 저장소에 올립니다. (`.env.local`은 올라가지 않습니다)
2. [Vercel](https://vercel.com/new)에서 저장소를 Import합니다. Framework Preset은 Next.js로 자동 인식됩니다.
3. **첫 배포 전에** Settings → Environment Variables에 `NOTION_API_KEY`, `NOTION_DATABASE_ID`를 Production/Preview 모두에 등록합니다.
4. Deploy 후 사이트에서 레시피가 보이는지 확인합니다.

Notion에서 글을 고치면 최대 30분 안에 사이트에 반영됩니다. 반영 주기는 각 페이지의 `export const revalidate = 1800`으로 조절합니다. Notion 이미지 URL이 약 1시간 후 만료되므로 3600초 미만으로 유지하세요.

## 검사 명령어

```bash
npm run check-all   # 타입, 린트, 포맷 검사
npm run build       # 프로덕션 빌드
```
