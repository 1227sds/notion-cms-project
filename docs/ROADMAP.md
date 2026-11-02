# 🗺️ 개발 로드맵: 개인 레시피 북

## Phase 0. 문서

- [x] `docs/PRD.md` 작성
- [x] `docs/ROADMAP.md` 작성

## Phase 1. 패키지·환경 설정

- [x] 최신 버전 업데이트 (Next, React, lucide-react, @hookform/resolvers)
- [x] `@notionhq/client`, `notion-to-md`, `react-markdown`, `remark-gfm` 설치
- [x] `src/lib/env.ts`에 Notion 환경변수 추가
- [x] `.env.example`, `.env.local` 추가
- [x] `next.config.ts`에 Notion 이미지 `remotePatterns` 추가

## Phase 2. Notion 클라이언트 레이어

- [x] `src/lib/notion/client.ts`
- [x] `src/lib/notion/types.ts`
- [x] `src/lib/notion/recipes.ts` (목록, 상세, 카테고리, 본문 마크다운)

## Phase 3. 목록 페이지

- [x] 홈 카드 그리드 (`/`)
- [x] 카테고리 필터 및 카테고리 페이지
- [x] `loading.tsx`, `not-found.tsx`

## Phase 4. 상세 페이지

- [x] `/recipes/[slug]` 구현
- [x] 마크다운 본문 렌더링
- [x] `generateStaticParams`, `generateMetadata`

## Phase 5. 스타일링·최적화

- [x] 헤더·푸터·네비게이션을 레시피 북에 맞게 수정
- [x] 반응형 확인
- [x] Notion 연동 후 실제 데이터로 검증
- [ ] Vercel 배포 및 환경변수 등록

## Phase 6. 확장 (선택)

- [ ] 검색
- [ ] 태그 페이지
- [ ] 즐겨찾기
