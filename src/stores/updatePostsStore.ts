import { create } from 'zustand'
import logger from '@/utils/logMiddleware'

type UpdatePostsStore = {
  update: number
  updatePosts: () => void
}

const useUpdatePostsStore = create<UpdatePostsStore>()(
  logger(set => ({
    update: 0,
    updatePosts: () => set(state => ({ update: state.update + 1 }))
  }))
)

export default useUpdatePostsStore
