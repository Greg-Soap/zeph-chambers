import type { Login, Register } from '@/types/auth'
import api from './http.service'
import { removeToken } from '@/lib/cookies'
import type { User } from '@/types/user'

class ZephService {
  // Authentication

  static register(data: Register) {
    return api.post<{ message: string; token: string; user: User }>('/auth/register', data)
  }

  static login(data: Login) {
    return api.post<{ message: string; token: string; user: User }>('/auth/login', data)
  }

  static verifyOtp(userId: string, otp: string) {
    return api.get(`/auth/verify/otp/${userId}/${otp}`)
  }

  static forgotPassword(email: string) {
    return api.get<{ data: string; message: string }>(`/auth/forget-password/${email}`)
  }

  static changePassword(userId: string, password: string) {
    return api.patch('/auth/change-password', { userId, password })
  }

  static logout() {
    removeToken()
  }
}

const zephService = ZephService

export default zephService
