import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Expand, UserApi } from '@/api'
import TaroStorage from '@/utils/TaroStorage'
import logger from '@/utils/logMiddleware'

type User = Expand<Awaited<ReturnType<(typeof UserApi)['info']>>>

type UserStore = User & {
  setInfo: (info: User) => void
  logout: () => void
}

const initUser: User = {
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
