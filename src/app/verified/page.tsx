import Link from 'next/link'

interface Props {
  searchParams: Promise<{ status?: string }>
}

const messages = {
  success: {
    title: 'Email verified!',
    description: 'Your email has been verified. You can now sign in.',
    emoji: '✅',
  },
  'already-verified': {
    title: 'Already verified',
    description: 'Your email address is already verified.',
    emoji: '✅',
  },
  invalid: {
    title: 'Invalid link',
    description: 'This verification link is invalid or has expired.',
    emoji: '❌',
  },
} as const

export default async function VerifiedPage({ searchParams }: Props) {
  const { status } = await searchParams

  const content = messages[status as keyof typeof messages] ?? {
    title: 'Something went wrong',
    description: 'We could not process your verification request.',
    emoji: '⚠️',
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="text-4xl">{content.emoji}</div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-muted-foreground">{content.description}</p>
        <Link href="/login" className="text-sm underline">
          Go to sign in
        </Link>
      </div>
    </div>
  )
}
