import { action, type Computed, computed, type Action } from 'easy-peasy'

export interface AuthStoreModel {
  user: { id: string; name: string; email: string } | null
  setUser: Action<AuthStoreModel, { id: string; name: string; email: string }>
  clearUser: Action<AuthStoreModel>
  isAuthenticated: Computed<AuthStoreModel, boolean>
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
}

export default authStore
