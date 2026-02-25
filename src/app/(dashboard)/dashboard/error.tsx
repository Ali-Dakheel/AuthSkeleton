'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h2 className="text-xl font-bold">Something went wrong</h2>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="text-sm border rounded-md px-4 py-2 hover:bg-muted transition-colors"
          >
            Try again
          </button>
          <Link href="/login" className="text-sm underline text-muted-foreground">
            Sign in again
          </Link>
        </div>
      </div>
    </div>
  )
}
