import { createStore, persist } from 'easy-peasy'
import authStore, { type AuthStoreModel } from './auth'

const store = createStore(
  {
    auth: persist(authStore, { storage: 'localStorage' }),
  },
  { name: 'globalStore' },
)

export default store

export interface StoreModel {
  auth: AuthStoreModel
}
