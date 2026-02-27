import { useAuthStore } from '@/store/auth.store'
import { clearTokenCookie } from '@/lib/session'
import { ApiError } from '@/types/auth'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = useAuthStore.getState().token

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  })

  if (res.status === 401) {
    useAuthStore.getState().clearAuth()
    clearTokenCookie().catch(() => {})
    if (typeof window !== 'undefined') {
      window.location.href = '/login?error=session_expired'
    }
    throw new ApiError('Session expired', 401, null)
  }

  if (res.status === 429) {
    throw new ApiError('Too many requests. Please slow down.', 429, null)
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: 'Request failed', errors: null }))
    throw new ApiError(body.message ?? 'Request failed', res.status, body.errors ?? null)
  }

  return res.json() as Promise<T>
}

export const api = {
  get: <T>(path: string, options?: RequestInit) =>
    apiFetch<T>(path, { ...options, method: 'GET' }),

  post: <T>(path: string, body?: unknown, options?: RequestInit) =>
    apiFetch<T>(path, { ...options, method: 'POST', body: JSON.stringify(body) }),

  patch: <T>(path: string, body?: unknown, options?: RequestInit) =>
    apiFetch<T>(path, { ...options, method: 'PATCH', body: JSON.stringify(body) }),

  delete: <T>(path: string, options?: RequestInit) =>
    apiFetch<T>(path, { ...options, method: 'DELETE' }),
}
