import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import TaroStorage from '@/utils/TaroStorage'

type LoginStore = {
  token?: string
  phone: string
  setPhone: (phone: string) => void
  setToken: (token: string) => void
}

const useLoginStore = create<LoginStore>()(
  persist(
    set => ({
      token: undefined,
      phone: '',
      setPhone: phone => set({ phone }),
      setToken: token => set({ token })
    }),
    {
      name: 'login-store',
      getStorage: () => TaroStorage
    }
  )
)

export default useLoginStore
