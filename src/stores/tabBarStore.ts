import { create } from 'zustand'
import logger from '@/utils/logMiddleware'

type TabBarStore = {
  active: number
  setActive: (active: number) => void
}

const useTabBarStore = create<TabBarStore>()(
  logger(set => ({
    active: 0,
    setActive: active => set({ active })
  }))
)

export default useTabBarStore
