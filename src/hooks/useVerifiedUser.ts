import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from './useCurrentUser'

/**
 * Use this instead of useCurrentUser in every dashboard page.
 * Redirects to /verify-email if the user hasn't verified their email yet.
 */
export function useVerifiedUser() {
  const query = useCurrentUser()
  const router = useRouter()
  const { data, isLoading } = query
  const user = data?.data

  useEffect(() => {
    if (!isLoading && user && !user.email_verified_at) {
      router.replace('/verify-email')
    }
  }, [isLoading, user, router])

  return query
}
