import { Suspense } from 'react'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div className="w-full max-w-md" />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
