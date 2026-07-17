---
name: Panquill Project Rules
---

# Panquill — Full Stack Recipe App

## Package Versions (never suggest alternatives or older APIs)

- next: ^16.1.6 — App Router only, server components by default
- react: ^19.2.4
- typescript: ^5.9.3
- drizzle-orm: ^0.45.1
- @clerk/nextjs: ^6.38.0
- tailwindcss: ^4 — CSS-first config via globals.css, NO tailwind.config.ts
- zod: ^4.3.6 — NOT v3, API differs
- react-hook-form: ^7.71.1
- react-select: ^5.10.2
- @base-ui/react: ^1.2.0
- @dnd-kit/react: ^0.3.2
- inngest: ^3.52.2
- sonner: ^2.0.7
- lucide-react: ^0.575.0
- @neondatabase/serverless: ^1.0.2,
- @t3-oss/env-nextjs: ^0.13.10,
- shadcn: ^3.8.5,

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

### Database — `src/drizzle/`

- `db.ts` — Drizzle client + Neon connection
- `schema.ts` — main schema entry point (imports all tables)
- `schemaHelpers.ts` — shared schema utilities (e.g. normalizedName helper)

#### Schema is split into 3 groups:

**core/** — main entity tables

- `core/recipes.ts` — recipes table + steps
- `core/users.ts` — user profiles

**junction/** — many-to-many join tables

- `junction/recipe-ingredients.ts` — recipe ↔ ingredient
- `junction/recipe-tags.ts` — recipe ↔ tag
- `junction/recipe-tools.ts` — recipe ↔ tool
- `junction/favourite-recipes.ts` — user ↔ recipe favorites

**lookup/** — dropdown/reference data tables

- `lookup/courses.ts`
- `lookup/cuisines.ts`
- `lookup/ingredients.ts`
- `lookup/tags.ts`
- `lookup/tools.ts`

> Feature DB code (queries, mutations) still lives in `src/features/<name>/db/` only.
> Lookup tables are what the `src/app/api/recipes/` dropdown routes query.

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

> When adding new background jobs: create a new file in `src/services/inngest/functions/`
> and register it in `src/app/api/inngest/route.ts`

---

### Utilities — `src/lib/`

- `api-helpers.ts` — checkAuth(), handleApiError(), withAuthHandler()
- cn helper — clsx + tailwind-merge

### Additional Core Directories

- `src/hooks/` — Custom React hooks
- `src/types/` — Global TypeScript definitions
- `src/data/` — Data and environment configuration. Includes `env/` for type-safe environment variables via `@t3-oss/env-nextjs`, and `dummyData.ts` for mock data.

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
- Flow: checkAuth() → Zod .parse() → DB mutation → revalidatePath()
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
- Env vars: Import `env` from `src/data/env/server` or `client`, NEVER use `process.env` directly.

## Documentation Lookup

- Always use the Context7 MCP tools (`resolve-library-id` then `get-library-docs`) for documentationon any dependency in package.json — Next.js, Drizzle ORM, Clerk, Zod, Tailwind CSS, shadcn/ui,React Hook Form, Inngest, Neon, etc. — before guessing at an API or relying on training knowledge.
- Only fall back to general web search if Context7 returns no matching library or no useful results.
- If a Context7 lookup returns unhelpful or empty results twice in a row for the same question,stop searching and either ask for clarification or answer with what's available, noting the gap.
- When the exact library is already known, reference it directly, e.g. "use library /vercel/next.js",to skip the resolve-library-id step.

---

## Read These Before Generating Code

- `src/drizzle/schema/core/recipes.ts`
- `src/drizzle/schema/core/users.ts`
- `src/drizzle/schema/junction/recipe-ingredients.ts`
- `src/drizzle/schema/lookup/` (read relevant lookup file for the task)
- `src/drizzle/schemaHelpers.ts`
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

| What                    | Where                                              |
| ----------------------- | -------------------------------------------------- |
| New API endpoint        | `src/app/api/recipes/<name>/route.ts`              |
| New server action       | `src/features/recipes/actions/index.ts`            |
| New DB query            | `src/features/recipes/db/queries.ts`               |
| New DB mutation         | `src/features/recipes/db/mutations.ts`             |
| New form component      | `src/features/recipes/components/editor/sections/` |
| New display component   | `src/features/recipes/components/preview/ui/`      |
| New shared UI           | `src/components/shared/`                           |
| New Zod schema          | `src/features/recipes/validation.ts`               |
| New TS type             | `src/features/recipes/types.ts`                    |
| New background job      | `src/services/inngest/functions/`                  |
| New Clerk UI component  | `src/services/clerk/components/`                   |
| New Clerk server helper | `src/services/clerk/libs/`                         |
| New lookup table        | `src/drizzle/schema/lookup/`                       |
| New junction table      | `src/drizzle/schema/junction/`                     |
| Toast                   | sonner `toast()`                                   |
| Icon                    | lucide-react                                       |
| Env variable            | `src/data/env/`                                    |
| Custom hook             | `src/hooks/`                                       |
| Global type             | `src/types/`                                       |
