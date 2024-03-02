import { type StoreApi, type UseBoundStore, create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import TaroStorage from '@/utils/TaroStorage'
import logger from '@/utils/logMiddleware'

type TabBarStore = {
  active: number
  setActive: (active: number) => void
}

let _useTabBarStore: UseBoundStore<StoreApi<TabBarStore>>

if (process.env.NODE_ENV === 'production') {
  _useTabBarStore = create<TabBarStore>()(
    logger(set => ({
      active: 0,
      setActive: active => set({ active })
    }))
  )
} else {
  _useTabBarStore = create<TabBarStore>()(
    persist(
      logger(set => ({
        active: 0,
        setActive: active => set({ active })
      })),
      {
        name: 'tab-bar-store',
        storage: createJSONStorage(() => TaroStorage)
      }
    )
  )
}

const useTabBarStore = _useTabBarStore

export default useTabBarStore
