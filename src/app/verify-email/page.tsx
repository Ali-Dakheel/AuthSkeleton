import Link from 'next/link'

export default function VerifyEmailPage() {
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
          <button className="underline cursor-pointer">request a new link</button>.
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
