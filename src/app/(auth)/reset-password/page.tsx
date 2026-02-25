import { Suspense } from 'react'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<p className="text-muted-foreground text-sm">Loading…</p>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}
