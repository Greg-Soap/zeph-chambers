export type ModelObject = Record<string, never>
type Tokens = 'user' | 'token' | 'subStatus' | 'completedSetup' | 'org' | string

interface CookieOptions {
  days?: number
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}

// Function to read a cookie and parse the value if it is an object
export function getCookie(name: Tokens): string | ModelObject | null {
  if (typeof window === 'undefined') return null

  const nameEQ = `${name}=`
  const cookies = document?.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim() // Trim leading spaces
    if (cookie.startsWith(nameEQ)) {
      const cookieValue = cookie.substring(nameEQ.length)

      // Try to decode and parse as JSON; if this fails, return the raw value
      try {
        return JSON.parse(decodeURIComponent(cookieValue))
      } catch {
        try {
          // If decoding and parsing fail, try parsing without decoding
          return JSON.parse(cookieValue)
        } catch {
          // Return the raw value if all parsing attempts fail
          return cookieValue
        }
      }
    }
  }
  return null
}

// Function to set a cookie, encoding only the value if it's an object or needs encoding
export function setCookie(
  name: string,
  value: string | object,
  options: CookieOptions = {},
): boolean {
  if (typeof window === 'undefined') return false
  const { days = 60, path = '/', domain, secure, sameSite } = options
  // No encoding for the value
  let stringValue: string
  if (typeof value === 'object') {
    stringValue = JSON.stringify(value)
  } else {
    stringValue = value
  }
  let cookieString = `${name}=${stringValue}`
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    cookieString += `; expires=${date.toUTCString()}`
  }
  cookieString += `; path=${path}`
  if (domain) cookieString += `; domain=${domain}`
  if (secure) cookieString += '; secure'
  if (sameSite) cookieString += `; samesite=${sameSite}`
  document.cookie = cookieString
  return true
}
// Function to delete a cookie given a name
export function deleteCookie(name: Tokens) {
  if (typeof window === 'undefined') return null
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
}

export const setToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('zephToken', token)
  }
}

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('zephToken')
  }
  return null
}

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('zephToken')
  }
}
