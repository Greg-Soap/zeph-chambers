import type { User } from '@/types/user'
import { action, type Computed, computed, type Action } from 'easy-peasy'

export interface AuthStoreModel {
  user: User | null
  setUser: Action<AuthStoreModel, User>
  clearUser: Action<AuthStoreModel>
  isAuthenticated: Computed<AuthStoreModel, boolean>
  isAdmin: Computed<AuthStoreModel, boolean>
}

const authStore: AuthStoreModel = {
  user: null,

  setUser: action((state, payload) => {
    state.user = payload
  }),

  clearUser: action((state) => {
    state.user = null
  }),
  isAuthenticated: computed((state) => !!state.user),
  isAdmin: computed((state) => state.user?.isAdmin ?? false),
}

export default authStore
