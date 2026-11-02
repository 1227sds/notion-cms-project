# 📋 PRD: 개인 레시피 북

Notion 데이터베이스를 CMS로 사용하는 개인 레시피 웹사이트.
Notion에 레시피를 작성하면 카드 그리드 목록, 상세 페이지, 카테고리 필터가 자동으로 만들어진다.

## 🎯 목표

- Notion만으로 레시피를 작성·발행한다 (별도 관리자 화면 없음)
- 30분 내 만들 수 있는 MVP: 목록 + 상세 + 카테고리 필터
- ISR로 Notion 변경 사항이 자동 반영된다

## 🛠️ 기술 스택 (최신 버전 유지)

| 영역        | 기술                                             |
| ----------- | ------------------------------------------------ |
| Frontend    | Next.js (App Router), React, TypeScript          |
| CMS         | Notion API (`@notionhq/client`)                  |
| 본문 렌더링 | `notion-to-md` + `react-markdown` + `remark-gfm` |
| Styling     | Tailwind CSS, shadcn/ui                          |
| Icons       | Lucide React                                     |
| Deployment  | Vercel                                           |

## 🗄️ Notion 데이터베이스 구조

| 속성       | 타입         | 설명                               |
| ---------- | ------------ | ---------------------------------- |
| Title      | title        | 제목                               |
| Slug       | rich_text    | URL 슬러그 (비우면 페이지 ID 사용) |
| Category   | select       | 카테고리                           |
| Tags       | multi_select | 태그                               |
| Published  | date         | 발행일 (최신순 정렬 기준)          |
| Status     | select       | `초안` / `발행됨` (발행됨만 노출)  |
| CookTime   | number       | 조리시간(분)                       |
| Difficulty | select       | `쉬움` / `보통` / `어려움`         |
| Cover      | files        | 대표 이미지 (없으면 페이지 커버)   |
| (본문)     | page content | 페이지 본문 블록                   |

## 🖥️ 화면 구성

- **홈 `/`**: 최근 레시피 카드 그리드 + 카테고리 필터
- **카테고리 `/category/[category]`**: 카테고리별 레시피 목록
- **상세 `/recipes/[slug]`**: 메타 정보(카테고리, 조리시간, 난이도, 태그) + 본문

## ✅ MVP 범위

- Notion API 연동
- 목록 및 상세 페이지
- 기본 스타일링
- 반응형 디자인 (1 → 2 → 3열 그리드)

## 🚀 확장 후보

- 검색
- 태그 페이지
- 즐겨찾기 (localStorage)
- 인분 수 계산, 장보기 리스트
