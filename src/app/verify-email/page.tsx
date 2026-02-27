'use client'

import { useState } from 'react'
import Link from 'next/link'
import { authApi } from '@/lib/api/auth'

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleResend = async () => {
    setStatus('sending')
    try {
      await authApi.resendVerification()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="text-4xl">📬</div>
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="text-muted-foreground">
          We sent a verification link to your email address. Click the link to verify your account.
        </p>
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive it? Check your spam folder or{' '}
          <button
            onClick={handleResend}
            disabled={status === 'sending' || status === 'sent'}
            className="underline cursor-pointer disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent!' : 'request a new link'}
          </button>
          {status === 'error' && (
            <span className="text-destructive ml-1">— failed, try again.</span>
          )}
        </p>
        <p className="text-sm">
          Already verified?{' '}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
