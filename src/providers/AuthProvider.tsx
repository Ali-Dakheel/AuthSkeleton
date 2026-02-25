'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'

/**
 * Client component that hydrates Zustand auth store from the token
 * passed down from the root layout (which reads the httpOnly cookie server-side).
 */
export default function AuthProvider({
  token,
  children,
}: {
  token: string | null
  children: React.ReactNode
}) {
  const { setToken, clearAuth } = useAuthStore()

  useEffect(() => {
    if (token) {
      setToken(token)
    } else {
      clearAuth()
    }
  }, [token, setToken, clearAuth])

  return <>{children}</>
}
