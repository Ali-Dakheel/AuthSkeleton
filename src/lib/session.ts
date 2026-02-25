/**
 * Sets the auth token as an httpOnly cookie via the Next.js Route Handler.
 * Must go through a Route Handler — JS cannot set httpOnly cookies directly.
 */
export async function setTokenCookie(token: string): Promise<void> {
  await fetch('/api/auth/set-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })
}

/**
 * Clears the auth token cookie via the Next.js Route Handler.
 */
export async function clearTokenCookie(): Promise<void> {
  await fetch('/api/auth/clear-token', { method: 'POST' })
}
