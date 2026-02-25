// Route protection is handled by proxy.ts at the edge.
// This layout is intentionally a plain wrapper — add auth-page-specific
// UI scaffolding here (e.g. centered card, background gradient) as needed.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
