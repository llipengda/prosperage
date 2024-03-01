import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import TaroStorage from '@/utils/TaroStorage'
import logger from '@/utils/logMiddleware'

type LoginStore = {
  token?: string
  phone?: string
  setPhone: (phone: string) => void
  setToken: (token: string) => void
}

const useLoginStore = create<LoginStore>()(
  persist(
    // TODO: Remove this in production
    logger(set => ({
      token: undefined as string | undefined,
      phone: undefined as string | undefined,
      setPhone: phone => set({ phone }),
      setToken: token => set({ token })
    })),
    {
      name: 'login-store',
      storage: createJSONStorage(() => TaroStorage)
    }
  )
)

export default useLoginStore
