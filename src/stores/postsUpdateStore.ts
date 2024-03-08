import { create } from 'zustand'
import logger from '@/utils/logMiddleware'

type PostsUpdateStore = {
  update: number
  updatePosts: () => void
}

const usePostsUpdateStore = create<PostsUpdateStore>()(
  logger(set => ({
    update: 0,
    updatePosts: () => set(state => ({ update: state.update + 1 }))
  }))
)

export default usePostsUpdateStore
