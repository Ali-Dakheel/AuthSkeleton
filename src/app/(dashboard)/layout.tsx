// Route protection is handled by proxy.ts at the edge.
// This layout is intentionally a plain wrapper — add dashboard chrome
// here (sidebar, navbar, etc.) as your app grows.
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
