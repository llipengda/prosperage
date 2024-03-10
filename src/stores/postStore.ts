import { create } from 'zustand'
import type TPost from '@/types/Post'
import logger from '@/utils/logMiddleware'

type PostStore = {
  posts: TPost[]
  setPosts: {
    (posts: TPost[]): void
    (fn: (posts: TPost[]) => TPost[]): void
  }
  updateLikes: (id: number, isLiked: boolean, delta: number) => void
  updateShares: (id: number, delta: number) => void
  updateComments: (id: number, delta: number) => void
}

const usePostStore = create<PostStore>()(
  logger(set => ({
    posts: [] as TPost[],
    setPosts: postsOrFn => {
      if (typeof postsOrFn === 'function') {
        set(state => ({ posts: postsOrFn(state.posts) }))
      } else {
        set({ posts: postsOrFn })
      }
    },
    updateLikes: (id, isLiked, delta) =>
      set(state => ({
        posts: state.posts.map(post =>
          post.id === id
            ? { ...post, isLiked, likes: delta + post.likes }
            : post
        )
      })),
    updateShares: (id, delta) =>
      set(state => ({
        posts: state.posts.map(post =>
          post.id === id ? { ...post, shares: delta + post.shares } : post
        )
      })),
    updateComments: (id, delta) =>
      set(state => ({
        posts: state.posts.map(post =>
          post.id === id ? { ...post, comments: delta + post.comments } : post
        )
      }))
  }))
)

export default usePostStore
