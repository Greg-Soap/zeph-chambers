export interface User {
  id: string
  fullName: string
  email: string
  createdAt: string
  updatedAt: string
  isEmailVerified: boolean
  isArchived: boolean
  otpSecret: string
  isAdmin: boolean
}
