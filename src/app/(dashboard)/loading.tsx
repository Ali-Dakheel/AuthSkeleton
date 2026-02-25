export default function DashboardLoading() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-8 w-32 bg-muted rounded" />
          <div className="h-9 w-20 bg-muted rounded-md" />
        </div>
        <div className="border rounded-lg p-6 space-y-3">
          <div className="h-5 w-48 bg-muted rounded" />
          <div className="h-4 w-64 bg-muted rounded" />
          <div className="h-5 w-24 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  )
}
