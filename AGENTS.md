---
name: Panquill Project Rules
---

# Panquill — Full Stack Recipe App

## Package Versions (never suggest alternatives or older APIs)

- next: ^16.2.10 — App Router only, server components by default
- react: ^19.2.7
- typescript: ^5.9.3
- @prisma/client: ^7.8.0
- @prisma/adapter-pg: ^7.8.0
- prisma: ^7.8.0 (devDependency)
- pg: ^8.22.0 — local PostgreSQL driver (NOT Neon)
- @clerk/nextjs: ^7.6.3
- @clerk/themes: ^2.4.57
- tailwindcss: ^4.3.3 — CSS-first config via globals.css, NO tailwind.config.ts
- zod: ^4.4.3 — NOT v3, API differs
- react-hook-form: ^7.81.0
- @hookform/resolvers: ^5.4.0
- react-select: ^5.10.2
- @base-ui/react: ^1.6.0
- @dnd-kit/react: ^0.5.0
- inngest: ^4.13.0
- sonner: ^2.0.7
- lucide-react: ^1.24.0
- next-themes: ^0.4.6
- embla-carousel-react: ^8.6.0
- @t3-oss/env-nextjs: ^0.13.11
- @t3-oss/env-core: ^0.13.11
- shadcn: ^4.13.0
- dotenv: ^17.4.2

---

## Tailwind v4 — CSS Variables (from globals.css)

Tailwind v4 uses CSS-first config. All colors are CSS variables mapped via @theme inline.
Never use hardcoded Tailwind color classes (e.g. bg-orange-500).
Always use semantic token classes:

### Colors

- bg-background / text-foreground
- bg-card / text-card-foreground
- bg-popover / text-popover-foreground
- bg-primary / text-primary / text-primary-foreground
- bg-secondary / text-secondary-foreground
- bg-muted / text-muted-foreground
- bg-accent / text-accent-foreground
- bg-destructive / text-destructive-foreground
- border-border
- bg-input
- ring-ring
- bg-sidebar / text-sidebar-foreground
- bg-sidebar-primary / text-sidebar-primary-foreground
- bg-sidebar-accent / text-sidebar-accent-foreground
- border-sidebar-border

### Typography

- font-sans (Inter)
- font-serif (Lora)
- font-mono (JetBrains Mono)

### Radius

- rounded-sm, rounded-md, rounded-lg (base = 0.75rem), rounded-xl

### Shadows

- shadow-2xs, shadow-xs, shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl, shadow-2xl

---

## Architecture

### Routing — `src/app/`

- `(auth)/` — Clerk auth routes
- `(app)/(protected)/` — auth-required pages (e.g. /recipes/create)
- `(app)/(public)/` — guest pages (e.g. /cookbook, /recipes/[id])
- `api/recipes/` — client-fetch endpoints only (dropdowns, autocomplete)
- `api/inngest/` — Inngest background job server endpoint

---

### Features — `src/features/`

Each feature follows this internal structure:

- `actions/index.ts` — Server Actions
- `db/queries.ts` — raw reads
- `db/mutations.ts` — raw writes
- `db/cache/` — unstable_cache wrappers
- `components/` — feature-scoped UI
- `types.ts` — TS interfaces
- `validation.ts` — Zod schemas
- `index.ts` — barrel export (public API for the feature)

#### Recipe Feature — `src/features/recipes/`

- `components/search/` — search input + filter logic
- `components/cards/` — RecipeCard, RecipeSkeleton
- `components/editor/sections/` — form field components
- `components/editor/recipe-editor-tab.tsx` — write side tab
- `components/preview/ui/` — high-fidelity display components
- `components/preview/recipe-preview-tab.tsx` — read side tab
- `components/preview/recipe-full-view.tsx` — public page view
- `components/recipe-tabs-container.tsx` — parent: owns useForm + Tabs state

#### Other Features

- `src/features/dashboard/` — Hero, Recommendation, Trending components
- `src/features/user-recipes/` — favorites/owned recipe queries + grid layouts
- `src/features/users/` — User related features (e.g., SidebarUserButton, user DB queries & cache)
- `src/features/cookbook/` — CookbookView (Search + List)

### Database — `prisma/` + `src/prisma/`

- `prisma.config.ts` — Prisma config (schema path, migrations path, datasource URL)
- `prisma/schema.prisma` — root schema file (generator + datasource declarations)
- `prisma/models/core.prisma` — core entity models (User, Recipe)
- `prisma/models/junction.prisma` — many-to-many join models (FavouriteRecipe, RecipeIngredient, RecipeRating, RecipeCuisine, RecipeTag, RecipeTool)
- `prisma/models/lookup.prisma` — dropdown/reference models (Course, Cuisine, Ingredient, Tag, Tool)
- `prisma/migrations/` — Prisma migration history
- `prisma/generated/prisma/` — auto-generated Prisma client (do NOT edit)
- `src/prisma/db.ts` — PrismaClient singleton (uses `@prisma/adapter-pg` with local pg connection string)

#### DB Connection

Uses `@prisma/adapter-pg` (local PostgreSQL via the `pg` driver — **not** Neon).
Connection string is assembled from individual env vars (`DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`) inside `src/data/env/database.ts`.

#### Schema Groups

**core** — main entity tables (`prisma/models/core.prisma`)

- `User` — user profiles
- `Recipe` — recipes + steps/tips arrays

**junction** — many-to-many join tables (`prisma/models/junction.prisma`)

- `FavouriteRecipe` — user <-> recipe favorites
- `RecipeCuisine` — recipe <-> cuisine
- `RecipeIngredient` — recipe <-> ingredient (with quantity)
- `RecipeRating` — recipe <-> user ratings
- `RecipeTag` — recipe <-> tag
- `RecipeTool` — recipe <-> tool

**lookup** — dropdown/reference data tables (`prisma/models/lookup.prisma`)

- `Course`
- `Cuisine`
- `Ingredient`
- `Tag`
- `Tool`

> Feature DB code (queries, mutations) still lives in `src/features/<name>/db/` only.
> Lookup tables are what the `src/app/api/recipes/` dropdown routes query.
> Import `prisma` from `src/prisma/db.ts` — never instantiate PrismaClient directly.

### Global UI — `src/components/`

- `ui/` — base shadcn components
- `shared/` — Carousel (embla), Select, Pagination
- `layout/` — Sidebar, Header
- `providers/` — ThemeProvider (next-themes)

---

### Infrastructure — `src/services/`

#### Clerk — `src/services/clerk/`

- `components/AuthButtons.tsx` — sign in/out button UI
- `components/ClerkProvider.tsx` — Clerk context provider wrapper
- `components/SignInStatus.tsx` — displays current auth state
- `libs/getCurrentAuth.ts` — server-side helper to get current user/session

#### Inngest — `src/services/inngest/`

- `client.ts` — Inngest client instance (import this to trigger jobs)
- `functions/clerk.ts` — background jobs triggered by Clerk events
- `functions/types.ts` — shared type definitions for Inngest functions

> When adding new background jobs: create a new file in `src/services/inngest/functions/`
> and register it in `src/app/api/inngest/route.ts`

---

### Utilities — `src/lib/`

- `api-helpers.ts` — checkAuth(), handleApiError(), withAuthHandler()
- cn helper — clsx + tailwind-merge

### Additional Core Directories

- `src/hooks/` — Custom React hooks
- `src/types/` — Global TypeScript definitions
- `src/data/` — Data and environment configuration:
  - `env/server.ts` — server-only env vars (Clerk keys, etc.)
  - `env/client.ts` — client-safe env vars
  - `env/database.ts` — DB connection env vars (DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME -> DATABASE_URL)
  - `dummyData.ts` — mock data
  - `siteDetails.ts` — site metadata constants

### Proxy

- `src/proxy.ts` — Clerk protected route rules

---

## Patterns

### API Route pattern (read `src/app/api/recipes/` for reference)

- Import query directly from `src/features/recipes/db/queries`
- Use NextRequest + NextResponse from 'next/server'
- Dropdown routes are PUBLIC — no auth check needed
- Read search param via `req.nextUrl.searchParams.get('search')`
- Return mapped SelectOption shape: `{ id, value: c.normalizedName, label: c.name }`
- Auth (checkAuth) is only used in Server Actions, not these routes

### Server Actions (read `src/features/recipes/actions/index.ts`)

- "use server" at top
- Flow: checkAuth() -> Zod .parse() -> DB mutation -> revalidatePath()
- Never use API routes for form submissions

### Forms

- mode: "onTouched", reValidateMode: "onChange"
- Two schemas: recipeFormSchema (loose) + recipeSubmitSchema (strict via .extend())
- SelectOption shape: `{ id, value, label }`
- TempIds for AI-suggested entities: `temp_ing_0`, `temp_tag_0`

### General

- Toasts: sonner only — never shadcn toast
- Icons: lucide-react only
- "use client" only when strictly necessary
- Server components by default
- Env vars: Import `env` from `src/data/env/server`, `src/data/env/client`, or `src/data/env/database` — NEVER use `process.env` directly.

## Documentation Lookup

- Always use the Context7 MCP tools (`resolve-library-id` then `get-library-docs`) for documentation on any dependency in package.json — Next.js, Prisma, Clerk, Zod, Tailwind CSS, shadcn/ui, React Hook Form, Inngest, etc. — before guessing at an API or relying on training knowledge.
- Only fall back to general web search if Context7 returns no matching library or no useful results.
- If a Context7 lookup returns unhelpful or empty results twice in a row for the same question, stop searching and either ask for clarification or answer with what's available, noting the gap.
- When the exact library is already known, reference it directly, e.g. "use library /prisma/prisma", to skip the resolve-library-id step.

---

## Read These Before Generating Code

- `prisma/schema.prisma` + `prisma/models/` (core, junction, lookup)
- `src/prisma/db.ts`
- `src/data/env/database.ts`
- `src/features/recipes/validation.ts`
- `src/features/recipes/types.ts`
- `src/features/recipes/actions/index.ts`
- `src/app/api/recipes/` (any route.ts)
- `src/app/globals.css`
- `src/services/clerk/libs/getCurrentAuth.ts`
- `src/services/inngest/client.ts`
- `src/services/inngest/functions/clerk.ts` (before adding new background jobs)

---

## Where Things Live

| What                    | Where                                                   |
| ----------------------- | ------------------------------------------------------- |
| New API endpoint        | `src/app/api/recipes/<name>/route.ts`                   |
| New server action       | `src/features/recipes/actions/index.ts`                 |
| New DB query            | `src/features/recipes/db/queries.ts`                    |
| New DB mutation         | `src/features/recipes/db/mutations.ts`                  |
| New form component      | `src/features/recipes/components/editor/sections/`      |
| New display component   | `src/features/recipes/components/preview/ui/`           |
| New shared UI           | `src/components/shared/`                                |
| New Zod schema          | `src/features/recipes/validation.ts`                    |
| New TS type             | `src/features/recipes/types.ts`                         |
| New background job      | `src/services/inngest/functions/`                       |
| New Clerk UI component  | `src/services/clerk/components/`                        |
| New Clerk server helper | `src/services/clerk/libs/`                              |
| New core model          | `prisma/models/core.prisma`                             |
| New lookup model        | `prisma/models/lookup.prisma`                           |
| New junction model      | `prisma/models/junction.prisma`                         |
| Toast                   | sonner `toast()`                                        |
| Icon                    | lucide-react                                            |
| Env variable            | `src/data/env/`                                         |
| Custom hook             | `src/hooks/`                                            |
| Global type             | `src/types/`                                            |
