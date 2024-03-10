import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import TaroStorage from '@/utils/TaroStorage'
import logger from '@/utils/logMiddleware'

type LoginStore = {
  token: string | undefined
  phone: string | undefined
  setPhone: (phone: string) => void
  setToken: (token: string) => void
  removeToken: () => void
}

const useLoginStore = create<LoginStore>()(
  persist(
    logger(
      set => ({
        token: undefined as string | undefined,
        phone: undefined as string | undefined,
        setPhone: phone => set({ phone }),
        setToken: token => set({ token }),
        removeToken: () => set({ token: undefined })
      }),
      'loginStore'
    ),
    {
      name: 'login-store',
      storage: createJSONStorage(() => TaroStorage)
    }
  )
)

export default useLoginStore
