# Frontend — Next.js 16 Auth

Auth UI built with Next.js 16 App Router. Consumes the Laravel backend API.

## Stack

- **Next.js 16.1** with Turbopack, React Compiler enabled
- **React 19**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui**
- **Zustand** — in-memory auth state
- **TanStack Query v5** — server state (`/user/me`)
- **React Hook Form v7 + Zod v4** — form validation

## Setup

```bash
npm install
cp .env.local.example .env.local
```

`.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/dashboard` or `/login` |
| `/login` | Email/password login + Google OAuth |
| `/register` | Registration + Google OAuth |
| `/verify-email` | "Check your email" screen (post-registration) |
| `/verified` | Email verified confirmation |
| `/forgot-password` | Request password reset email |
| `/reset-password` | Set new password (via email link) |
| `/auth/callback` | OAuth token handler (Google redirect lands here) |
| `/dashboard` | Protected — requires auth |

## Architecture

### Token Storage

Tokens from the backend are stored as **httpOnly cookies** — never in `localStorage`. The flow:

```
Login → get token in JSON response
     → POST /api/auth/set-token (Next.js Route Handler sets httpOnly cookie)
     → Zustand setAuth() (in-memory, cleared on refresh)
```

On page load, the root Server Component reads the cookie and passes it to `AuthProvider`, which re-hydrates Zustand.

### Route Protection

`proxy.ts` (Next.js 16 middleware) is the single guard:
- `/dashboard/*` without cookie → redirect to `/login`
- `/login`, `/register` with cookie → redirect to `/dashboard`

No auth checks inside individual pages or layouts.

### Key Files

```
src/
├── proxy.ts                     # Route guard (renamed from middleware.ts in Next.js 16)
├── lib/
│   ├── api/client.ts            # Fetch wrapper (Bearer token, typed errors)
│   ├── api/auth.ts              # All Laravel API calls
│   └── session.ts               # httpOnly cookie helpers (setTokenCookie, clearTokenCookie)
├── store/auth.store.ts          # Zustand auth state
├── hooks/
│   ├── useCurrentUser.ts        # TanStack Query → GET /user/me
│   └── useLogout.ts             # Logout: revoke token + clear cookie + clear cache
└── providers/
    ├── AuthProvider.tsx         # Hydrates Zustand from cookie on load
    └── QueryProvider.tsx        # TanStack QueryClientProvider
```
