import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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
    logger(set => ({
      token: undefined,
      phone: undefined,
      setPhone: phone => set({ phone }),
      setToken: token => set({ token })
    })),
    {
      name: 'login-store',
      getStorage: () => TaroStorage
    }
  )
)

export default useLoginStore
