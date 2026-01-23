# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

La Goccia is a headless CMS application built with Next.js 16 and Payload CMS 3. It's a multilingual (Italian/English) content management system with a public frontend and admin interface.

**Stack:** Next.js 16 + React 19 + Payload CMS 3 + SQLite/Turso + S3 Storage + Tailwind CSS 4 + shadcn/ui

## Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack (runs migrations first)
pnpm devsafe          # Clear .next cache and start dev server

# Build & Production
pnpm build            # Run migrations and build for production
pnpm start            # Start production server

# Code Quality
pnpm fix              # Auto-fix linting/formatting with Ultracite/Biome
pnpm typecheck        # TypeScript type checking

# Payload CMS
pnpm generate:types   # Regenerate Payload TypeScript types
pnpm generate:importmap  # Regenerate Payload import map

# Database (Docker/MinIO for local dev)
pnpm db:up            # Start MinIO S3 container
pnpm db:down          # Stop MinIO container
pnpm db:purge         # Reset database and S3 storage
pnpm cleanup          # Full reset (db + .next + node_modules)
```

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── (frontend)/[locale]/    # Public pages with i18n routing
│   └── (payload)/admin/        # Payload CMS admin panel
├── i18n/                       # Internationalization config and messages
└── modules/                    # Feature modules (domain-organized)
    ├── blocks/                 # Content block types (text, image, video, quote, grid)
    ├── components/             # UI components (shadcn/ui in ui/, shared components)
    ├── payload/                # CMS config, collections, globals, migrations
    ├── posts/                  # Blog posts collection and revalidation
    ├── storage/                # S3 storage plugin and image collection
    ├── settings/               # Global page settings (home, about, project, goccia)
    └── utilities/              # Helper functions
```

### Path Aliases

```
@/*              → ./src/*
@public/*        → ./public/*
@payload-config  → ./src/modules/payload/payload.config.ts
@payload-types   → ./src/modules/payload/payload-types.ts
```

### Key Patterns

- **Payload Collections:** Users, Posts, Authors, Tags, Images (defined in `modules/payload/collections.ts`)
- **Payload Globals:** Page content settings for home, about, project, goccia pages
- **Content Blocks:** Composable content system in `modules/blocks/` - each block has config and render component
- **Access Control:** Role-based in `modules/payload/access/` (admin, editor, authenticated, public)
- **i18n:** next-intl with locale files in `i18n/messages/` (it.json, en.json)

### Data Fetching

- Use Server Components for async data fetching
- `getDocument()` and `getGlobals()` utilities in `modules/utilities/`
- Live preview supported via Payload's preview system

## Environment Setup

Copy `.env.example` to `.env`. Required variables:
- `PAYLOAD_SECRET` - CMS secret key
- `DATABASE_URL` - SQLite file path (local) or Turso URL (production)
- `S3_*` - Storage credentials (MinIO locally, R2/S3 in production)
- `NEXT_PUBLIC_MAPBOX_TOKEN` - For map components

## Code Standards (Ultracite)

This project uses **Ultracite** with Biome for linting/formatting. Run `pnpm fix` before committing.

### Key Rules

- Use `for...of` over `.forEach()` and indexed loops
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Use `const` by default, `let` only when reassignment is needed
- Call hooks at top level only, never conditionally
- Use Next.js `<Image>` component, not `<img>`
- Use Server Components for async data fetching
- React 19: Use ref as a prop instead of `React.forwardRef`
- Remove `console.log`, `debugger` from production code
- Avoid barrel files (index files that re-export everything)
