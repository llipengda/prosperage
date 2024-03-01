import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import TaroStorage from '@/utils/TaroStorage'
import logger from '@/utils/logMiddleware'

type TabBarStore = {
  active: number
  setActive: (active: number) => void
}

const useTabBarStore = create<TabBarStore>()(
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

export default useTabBarStore
