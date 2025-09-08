# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code (claude.ai/code)에게 지침을 제공합니다.

## 개발 명령어

- `pnpm run dev` 또는 `pnpm start` - 개발 서버 시작 (http://localhost:4321)
- `pnpm run build` - 프로덕션 빌드 생성
- `pnpm run preview` - 프로덕션 빌드 로컬 미리보기
- `pnpm run astro` - Astro CLI 명령어 실행

이 프로젝트는 **pnpm**을 패키지 매니저로 사용합니다 (package.json의 packageManager 참조).

## 프로젝트 아키텍처

React 컴포넌트, Tailwind CSS, MDX 지원을 포함한 **Astro.js 블로그**입니다. 주요 아키텍처 패턴:

### 콘텐츠 관리

- 블로그 포스트는 `src/content/blog/`에 Markdown/MDX 파일로 저장
- 콘텐츠 스키마는 `src/content/config.ts`에서 Zod 검증과 함께 정의
- 프론트매터 지원: title, description, pubDate, heroImage, tags, readingTime
- 타입 안전한 콘텐츠 처리를 위해 Astro의 콘텐츠 컬렉션 사용

### 레이아웃 계층구조

- `Layout.astro` - head, SEO, 테마 전환이 포함된 기본 HTML 레이아웃
- `BaseLayout.astro` - Layout.astro를 감싸는 래퍼
- `BlogPost.astro` - 블로그 포스트 페이지 전용 레이아웃
- `TransitionLayout.astro` - SPA 스타일 페이지 전환 처리

### 컴포넌트 아키텍처

- **Astro 컴포넌트** (.astro): 서버 사이드 렌더링 UI 컴포넌트
- **React 컴포넌트**: 상호작용하는 클라이언트 사이드 컴포넌트 (테마 토글 등)
- 하이브리드 접근법: 상호작용을 위한 선택적 하이드레이션과 함께 정적 생성

### 스타일링 시스템

- 사용자 정의 타이포그래피 플러그인 구성을 포함한 **Tailwind CSS**
- `class` 전략을 통한 다크/라이트 모드 지원
- 확장된 타이포그래피 스타일을 포함한 `tailwind.config.cjs`의 사용자 정의 Tailwind 구성
- `src/styles/global.css`의 글로벌 스타일

### 주요 기능

- **콘텐츠 컬렉션**: 타입 안전한 블로그 포스트 관리
- **태그 시스템**: 동적 태그 페이지 및 필터링
- **RSS 피드**: `/rss.xml`에서 자동 생성
- **테마 전환**: 부드러운 전환 효과를 가진 클라이언트 사이드 다크/라이트 모드
- **SPA 전환**: 라우트 간 부드러운 페이지 내비게이션
- **SEO 최적화**: 메타 태그, Open Graph, 구조화된 데이터

### 환경 구성

- Vercel 배포 대 로컬 개발을 위해 동적으로 구성되는 사이트 URL

### 파일 구조 패턴

- `src/pages/` - 파일 기반 라우팅 (Astro 관례)
- `src/components/` - 재사용 가능한 UI 컴포넌트
- `src/layouts/` - 페이지 레이아웃 템플릿
- `src/utils/` - 헬퍼 함수 및 유틸리티
- `src/content/` - 콘텐츠 컬렉션 및 스키마
- `public/` - 직접 서빙되는 정적 자산

### TypeScript 구성

- 경로 별칭: `@/*`는 `src/*`에 매핑
- Astro의 strict tsconfig 기반을 사용한 Strict TypeScript
- `src/env.d.ts`의 Astro 특정 타입 정의

## 이미지 최적화

### 중요: 이미지 컴포넌트 사용시 주의사항

- astro는 Image의 layout 속성을 사용하면 width, height을 자동으로 생성해
