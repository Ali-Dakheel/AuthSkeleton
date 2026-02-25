'use client'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useLogout } from '@/hooks/useLogout'

export default function DashboardPage() {
  const { data } = useCurrentUser()
  const logout = useLogout()

  const user = data?.data

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={logout}
            className="text-sm border rounded-md px-4 py-2 hover:bg-muted transition-colors"
          >
            Sign out
          </button>
        </div>

        <div className="border rounded-lg p-6 space-y-3">
          <h2 className="font-semibold">Welcome, {user?.name ?? '…'}</h2>
          <p className="text-sm text-muted-foreground">{user?.email ?? '…'}</p>
          <div>
            {user?.email_verified_at ? (
              <span className="inline-block text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                Email verified
              </span>
            ) : (
              <span className="inline-block text-xs bg-yellow-100 text-yellow-700 rounded-full px-2 py-0.5">
                Email not verified
              </span>
            )}
          </div>
          {user?.provider && (
            <p className="text-xs text-muted-foreground">Signed in with {user.provider}</p>
          )}
        </div>
      </div>
    </div>
  )
}
