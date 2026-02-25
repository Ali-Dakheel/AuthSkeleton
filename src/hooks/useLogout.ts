import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api/auth'
import { clearTokenCookie } from '@/lib/session'
import { useAuthStore } from '@/store/auth.store'

export function useLogout() {
  const router = useRouter()
  const { clearAuth } = useAuthStore()
  const queryClient = useQueryClient()

  return async () => {
    try {
      await authApi.logout()
    } catch {
      // Token may be expired — proceed with client-side cleanup regardless
    }
    await clearTokenCookie()
    queryClient.clear() // Prevent stale cache being shown to the next user
    clearAuth()
    router.push('/login')
    router.refresh()
  }
}
