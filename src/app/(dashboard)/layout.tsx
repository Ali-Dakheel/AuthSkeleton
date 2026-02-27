// Route protection (token presence) is handled by proxy.ts at the edge.
// This layout is intentionally a plain Server Component wrapper — add dashboard
// chrome (sidebar, navbar, etc.) here as your app grows.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
