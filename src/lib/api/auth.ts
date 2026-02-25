import type { ApiResponse, AuthResponse, User } from '@/types/auth'
import { api } from './client'

export const authApi = {
  register: (data: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => api.post<AuthResponse>('/api/v1/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/api/v1/auth/login', data),

  logout: () => api.post<ApiResponse<null>>('/api/v1/auth/logout'),

  me: () => api.get<ApiResponse<User>>('/api/v1/user/me'),

  forgotPassword: (data: { email: string }) =>
    api.post<ApiResponse<null>>('/api/v1/auth/forgot-password', data),

  resetPassword: (data: {
    token: string
    email: string
    password: string
    password_confirmation: string
  }) => api.post<ApiResponse<null>>('/api/v1/auth/reset-password', data),

  resendVerification: () =>
    api.post<ApiResponse<null>>('/api/v1/auth/email/verify/resend'),

  updateProfile: (data: { name?: string; avatar?: string }) =>
    api.patch<ApiResponse<User>>('/api/v1/user/profile', data),
}
