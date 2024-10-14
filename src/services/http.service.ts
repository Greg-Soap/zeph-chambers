import { getToken } from '@/lib/cookies'
import axios from 'axios'

export const multipartHeaders = {
  headers: { 'Content-Type': 'multipart/form-data' },
}

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'X-Device-Type': 'web',
    tokenId: process.env.TOKEN_ID,
  },
})

api.interceptors.request.use(
  (req) => {
    if (req.url?.includes('login')) return req

    const token = getToken()

    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
    return req
  },
  (err) => {
    Promise.reject(err)
  },
)

export default api
