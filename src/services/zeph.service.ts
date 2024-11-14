import type { Login, Register } from '@/types/auth'
import api from './http.service'
import type { User } from '@/types/user'

class ZephService {
  // Authentication

  static register(data: Register) {
    return api.post<{ message: string; user: User; otp?: string }>('/auth/register', data)
  }

  static resendVerificationOtp(email: string) {
    return api.post<{ message: string }>('/auth/resend-otp', { email })
  }

  static login(data: Login) {
    return api.post<{
      message: string
      requiresOtp: boolean
      email: string
      otp?: string
      isEmailVerified?: boolean
    }>('/auth/login', data)
  }

  static verifyLogin({ email, otp, password }: { email: string; otp: string; password?: string }) {
    return api.post<{ message: string; user: User; token: string }>('/auth/login/verify', {
      email,
      otp,
      password,
    })
  }

  static verifyOtp(email: string, otp: string) {
    return api.post<{ message: string; token: string; user: User; otp?: string }>(
      '/auth/verify-otp',
      { email, otp },
    )
  }

  static forgotPassword(email: string) {
    return api.post<{ message: string; otp?: string }>('/auth/forgot-password', { email })
  }

  static changePassword({
    email,
    otp,
    newPassword,
  }: { email: string; otp: string; newPassword: string }) {
    return api.post('/auth/reset-password', { email, otp, newPassword })
  }

  static logout() {
    return api.post<{ message: string }>('/auth/logout')
  }
}

const zephService = ZephService

export default zephService
