export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  avatar: string | null
  provider: string | null
  provider_id: string | null
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  success: boolean
  message: string
  data: {
    user: User
    token: string
  }
  errors: Record<string, string[]> | null
}

export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
  errors: Record<string, string[]> | null
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors: Record<string, string[]> | null = null,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
