'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/schemas/auth.schema'
import { authApi } from '@/lib/api/auth'

export default function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const email = searchParams.get('email') ?? ''
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({ resolver: zodResolver(resetPasswordSchema) })

  const onSubmit = async (data: ResetPasswordInput) => {
    setError(null)
    try {
      await authApi.resetPassword({ ...data, token, email })
      router.push('/login?reset=success')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to reset password')
    }
  }

  if (!token) {
    return (
      <div className="w-full max-w-md text-center space-y-4">
        <div className="text-4xl">❌</div>
        <h1 className="text-2xl font-bold">Invalid link</h1>
        <p className="text-muted-foreground text-sm">
          This password reset link is invalid or has expired.
        </p>
        <Link href="/forgot-password" className="text-sm underline">
          Request a new link
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Set new password</h1>
        <p className="text-muted-foreground mt-2 text-sm">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>
        )}

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">
            New Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className="w-full border rounded-md px-3 py-2 text-sm bg-background"
            {...register('password')}
          />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <div className="space-y-1">
          <label htmlFor="password_confirmation" className="text-sm font-medium">
            Confirm Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            autoComplete="new-password"
            className="w-full border rounded-md px-3 py-2 text-sm bg-background"
            {...register('password_confirmation')}
          />
          {errors.password_confirmation && (
            <p className="text-xs text-destructive">{errors.password_confirmation.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium disabled:opacity-50 transition-opacity"
        >
          {isSubmitting ? 'Resetting…' : 'Reset password'}
        </button>
      </form>
    </div>
  )
}
