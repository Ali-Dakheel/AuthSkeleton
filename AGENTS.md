<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`.
Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# Project-specific rules

## Stack
Next.js 16.1, React 19.2, TypeScript 5.1+, TailwindCSS v4, shadcn/ui
Zustand 5 (auth state), TanStack Query v5 (server state), React Hook Form v7 + Zod v4

## Key Next.js 16 changes — non-negotiable
- Route protection file: `src/proxy.ts` (NOT middleware.ts), function `proxy()` not `middleware()`
- `await cookies()`, `await headers()`, `await params`, `await searchParams` — ALL async, never sync access
- Turbopack is default bundler (no webpack config needed)

## Auth rules
- All Laravel API calls through `lib/api/client.ts` — never raw fetch() in components for API calls
- Token stored as httpOnly cookie via `/api/auth/set-token` route handler — never localStorage
- `proxy.ts` handles route protection — never check auth inside page components
- After login/register: call `POST /api/auth/set-token`, then `setAuth()` in Zustand, then `router.push()`
- After logout: call `authApi.logout()`, then `POST /api/auth/clear-token`, then `clearAuth()`

## Zod v4 syntax (CRITICAL — installed version is 4.x)
- Email: `z.email()` not `z.string().email()`
- URL: `z.url()` not `z.string().url()`
- UUID: `z.uuid()` not `z.string().uuid()`

## Performance rules (Vercel Engineering — CRITICAL priority)

### Eliminate waterfalls
- Defer `await` until the branch that needs it — don't block unused code paths
- Use `Promise.all()` for independent async operations — never sequential awaits
- Use `<Suspense>` boundaries so layouts render immediately while data streams in
- Use `React.cache()` for per-request deduplication of DB/auth queries

### Bundle size
- NEVER import from barrel files — use direct paths or add to `optimizePackageImports` in next.config.ts
- lucide-react is already in `optimizePackageImports` — import normally: `import { Check } from 'lucide-react'`
- Use `next/dynamic` with `{ ssr: false }` for heavy components not needed on first paint

### Server Components
- Only pass fields the client actually uses across the RSC boundary — not full objects
- Default to Server Components; add `'use client'` only when you need browser APIs or hooks

### Client Components
- Use `startTransition()` for non-urgent state updates
- Never `useEffect` for data fetching — use TanStack Query
- Use functional setState updates to prevent stale closures
- Avoid `&&` with numbers: `count > 0 ? <Badge /> : null` not `count && <Badge />`
- React Compiler is enabled — no manual `memo()`, `useMemo()`, or `useCallback()` needed

## Route structure
```
src/app/
  (auth)/           ← guest-only layout (redirects authenticated users to /dashboard)
    login/
    register/
    forgot-password/
    reset-password/
    callback/       ← OAuth token landing (sets cookie, redirects to /dashboard)
  (dashboard)/      ← protected layout (redirects unauthenticated users to /login)
    dashboard/
  verify-email/     ← no route group (accessible regardless of auth state)
  verified/         ← no route group (accessible regardless of auth state)
  layout.tsx        ← root layout with QueryProvider + AuthProvider
  page.tsx          ← redirects to /dashboard or /login based on cookie
```
