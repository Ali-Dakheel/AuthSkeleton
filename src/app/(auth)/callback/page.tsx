'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { setTokenCookie } from '@/lib/session'
import { useAuthStore } from '@/store/auth.store'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearAuth } = useAuthStore()

  useEffect(() => {
    const token = searchParams.get('token')
    const error = searchParams.get('error')

    if (error || !token) {
      clearAuth()
      router.replace('/login?error=oauth_failed')
      return
    }

    setTokenCookie(token)
      .then(() => {
        router.replace('/dashboard')
        router.refresh()
      })
      .catch(() => {
        router.replace('/login?error=oauth_failed')
      })
  }, [searchParams, router, clearAuth])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground text-sm">Completing sign in…</p>
    </div>
  )
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Completing sign in…</p>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  )
}
