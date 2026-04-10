# AGENTS.md

This file provides guidance for AI coding agents working in this repository.

## Project Overview

Astro.js 5.x personal blog (JK.dev) with MDX content, Tailwind CSS, and TypeScript.
Deployed on Vercel. Korean-language UI. Package manager: **pnpm**.

## Build & Dev Commands

```bash
pnpm run dev        # Dev server at http://localhost:4321
pnpm run build      # Production build (astro build)
pnpm run preview    # Preview production build locally
pnpm run astro      # Run Astro CLI commands directly
```

- **No test suite** — there are no tests configured in this project.
- **No linter** — no ESLint or similar. Formatting is handled by Prettier only.
- **Formatting**: `npx prettier --write .` (uses `.prettierrc` config).
- Always validate changes with `pnpm run build` before considering work complete.

## Prettier Configuration

```json
{
  "printWidth": 100,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"]
}
```

Astro files use the `astro` parser override. Tailwind classes are auto-sorted by the plugin.

## File Structure

```
src/
├── components/    # Reusable Astro components (PascalCase: Navigation.astro)
├── content/
│   ├── blog/      # MDX blog posts in folders (e.g., Firebase-auth-1/index.mdx)
│   └── config.ts  # Zod content schemas
├── layouts/       # Page layouts (Layout.astro, BlogPost.astro)
│   └── styles/    # Layout-specific CSS (markdown.css)
├── pages/         # File-based routing (index.astro, blog/[...slug].astro)
├── styles/        # Global CSS (global.css)
├── types/         # Type declarations (astro.d.ts)
├── utils/         # Helper functions (camelCase: heroImages.ts)
├── consts.ts      # Site-wide constants (SITE_TITLE, SITE_DESCRIPTION)
└── env.d.ts       # Astro environment type references
```

## Naming Conventions

| Item              | Convention    | Example                          |
|-------------------|---------------|----------------------------------|
| Components        | PascalCase    | `SEOComponent.astro`, `TagList.astro` |
| Utility files     | camelCase     | `heroImages.ts`, `heroImagePreload.ts` |
| Page files        | kebab/camel   | `index.astro`, `[...slug].astro` |
| Blog post folders | Mixed (Korean OK) | `Firebase-auth-1/`, `가상 스크롤링/` |
| Variables         | camelCase     | `sortedPosts`, `canonicalURL`    |
| Constants         | UPPER_SNAKE   | `SITE_TITLE`, `SITE_DESCRIPTION` |
| Types/Interfaces  | PascalCase    | `Props`, `BlogPost`, `HeroImageSlug` |

## TypeScript Guidelines

- **Strict mode** enabled (extends `astro/tsconfigs/strict`).
- Path alias: `@/*` maps to `src/*`.
- Use `export interface Props { ... }` for component props (preferred).
- `export type Props = ...` is acceptable when extending other types.
- Use `import type { ... }` for type-only imports.
- Content schemas use Zod (`z.object(...)`) in `src/content/config.ts`.
- Avoid `as any`, `@ts-ignore`, `@ts-expect-error` — fix type issues properly.

## Astro Component Structure

Follow this ordering within `.astro` files:

```astro
---
// 1. Framework/library imports
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';

// 2. External package imports
import rss from '@astrojs/rss';

// 3. Internal component imports (relative paths)
import Layout from '../layouts/Layout.astro';
import Navigation from '../components/Navigation.astro';

// 4. Internal utility/type imports
import { heroImages } from '../utils/heroImages';
import type { BlogPost } from '../content/config';

// 5. Style imports
import '../styles/global.css';

// 6. Props interface/type definition
export interface Props {
  title: string;
  class?: string;
}

// 7. Props destructuring with defaults
const { title, class: className = '' } = Astro.props;

// 8. Component logic (data fetching, computations)
const posts = await getCollection('blog');
---

<!-- Template HTML/JSX -->
<div class={className}>
  <slot />
</div>

<!-- Client-side JavaScript (if needed) -->
<script>
  document.addEventListener('DOMContentLoaded', () => { /* ... */ });
</script>

<!-- Scoped styles (always last) -->
<style>
  /* Component-scoped CSS */
</style>
```

## Styling Guidelines

- **Tailwind CSS** with `class` dark mode strategy (`dark:` prefix).
- **Color palette**: `zinc` consistently — avoid `gray`, `slate`, `neutral`.
- **Typography**: `@tailwindcss/typography` plugin for prose content.
- **Font**: Pretendard Variable (Korean-optimized, imported in global.css).
- CSS class pass-through: accept `class?: string` prop, destructure as `class: className = ''`.
- Component-scoped `<style>` blocks are preferred over global styles.
- Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:` (mobile-first).
- Dark mode: always pair light/dark variants (`text-zinc-900 dark:text-zinc-100`).

## Content Authoring

All blog posts are **MDX** files at `src/content/blog/<folder>/index.mdx`.

### Frontmatter Schema

```yaml
---
title: 'Post Title'          # Required: string
pubDate: 2025-08-11           # Required: date (YYYY-MM-DD)
description: 'Summary text'   # Required: string
tags: ['Tag1', 'Tag2']        # Optional: string[]
heroImage: './asset/hero.png'  # Optional: relative path to image
---
```

### Content Conventions

- Each post lives in its own folder with an `asset/` subdirectory for images.
- Hero images are mapped in `src/utils/heroImages.ts` — register new posts there.
- Import images in MDX with `import { Image } from 'astro:assets'` for optimization.
- UI text is in Korean. Comments are mixed Korean/English.

## Error Handling Patterns

- Use try/catch with `console.warn()` for non-critical failures (e.g., image processing).
- Use `console.error()` for critical failures.
- Prefer optional chaining (`?.`) and nullish coalescing (`??`) over explicit null checks.
- Provide fallback values via destructuring defaults.
- Never leave empty catch blocks.

## Image Handling

- Astro's `<Image>` component with `layout="constrained"` (configured in `astro.config.mjs`).
- Hero images are statically imported in `src/utils/heroImages.ts` for build-time optimization.
- Preload critical images via `generateHeroPreload()` from `src/utils/heroImagePreload.ts`.
- Use `fetchpriority="high"` and `loading="eager"` for above-the-fold hero images.
- Use `loading="lazy"` for below-the-fold images.

## Key Integrations

- **@astrojs/mdx**: MDX content support
- **@astrojs/tailwind**: Tailwind CSS integration
- **@astrojs/sitemap**: Auto-generated sitemap
- **@astrojs/rss**: RSS feed at `/rss.xml`
- **@critters-rs/astro**: Critical CSS inlining
- **astro-compress**: Asset compression
- **astro-seo**: SEO meta tags and Open Graph
- **schema-dts**: Typed JSON-LD structured data
- **@vercel/analytics** + **@vercel/speed-insights**: Production analytics

## Environment

- `SITE_ORIGIN` env var controls the site URL (loaded via Vite's `loadEnv`).
- `.npmrc`: `engine-strict=true`, `save-exact=true` (pin exact dependency versions).
- Never commit `.env` files — they are gitignored.
