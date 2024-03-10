import { create } from 'zustand'
import logger from '@/utils/logMiddleware'

interface UpdateCommentsStore {
  update: number
  updateComments: () => void
  reset: () => void
}

const useUpdateCommentsStore = create<UpdateCommentsStore>()(
  logger(set => ({
    update: 0,
    updateComments: () => set(state => ({ update: state.update + 1 })),
    reset: () => set({ update: 0 })
  }))
)

export default useUpdateCommentsStore
