import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type TUser from '@/types/User'
import TaroStorage from '@/utils/TaroStorage'
import logger from '@/utils/logMiddleware'

type UserStore = TUser & {
  setInfo: (info: TUser) => void
  logout: () => void
}

const initUser: TUser = {
  id: -1,
  type: -1,
  name: '',
  openId: '',
  createTime: '',
  deleteTime: '',
  gender: -1,
  isVerified: false,
  phone: '',
  nation: '',
  documentNumber: '',
  documentType: -1,
  documentValidDate: '',
  job: '',
  address: '',
  avatar: ''
}

const useUserStore = create<UserStore>()(
  persist(
    logger(set => ({
      ...initUser,
      setInfo: info => set(info),
      logout: () => set(initUser)
    })),
    {
      name: 'user-store',
      storage: createJSONStorage(() => TaroStorage)
    }
  )
)

export default useUserStore
