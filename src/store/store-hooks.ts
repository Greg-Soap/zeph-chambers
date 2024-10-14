'use client'
import { createTypedHooks } from 'easy-peasy'
import type { StoreModel } from './store'

const typedHooks = createTypedHooks<StoreModel>()

export const useGlobalAction = typedHooks.useStoreActions
export const useGlobalDispatch = typedHooks.useStoreDispatch
export const useGlobalStore = typedHooks.useStoreState
