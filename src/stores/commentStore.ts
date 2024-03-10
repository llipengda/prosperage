import { create } from 'zustand'
import type TComment from '@/types/Comment'
import logger from '@/utils/logMiddleware'

type CommentStore = {
  comments: TComment[]
  setComments: {
    (comments: TComment[]): void
    (fn: (comments: TComment[]) => TComment[]): void
  }
  updateLikes: (id: number, isLiked: boolean, delta: number) => void
  updateShares: (id: number, delta: number) => void
  updateReplies: (id: number, delta: number) => void
}

const useCommentStore = create<CommentStore>()(
  logger(
    set => ({
      comments: [] as TComment[],
      setComments: commentsOrFn => {
        if (typeof commentsOrFn === 'function') {
          set(state => ({ comments: commentsOrFn(state.comments) }))
        } else {
          set({ comments: commentsOrFn })
        }
      },
      updateLikes: (id, isLiked, delta) =>
        set(state => ({
          comments: state.comments.map(comment =>
            comment.id === id
              ? { ...comment, isLiked, likes: delta + comment.likes }
              : comment
          )
        })),
      updateShares: (id, delta) =>
        set(state => ({
          comments: state.comments.map(comment =>
            comment.id === id
              ? { ...comment, shares: delta + comment.shares }
              : comment
          )
        })),
      updateReplies: (id, delta) =>
        set(state => ({
          comments: state.comments.map(comment =>
            comment.id === id
              ? { ...comment, replies: delta + comment.replies }
              : comment
          )
        }))
    }),
    'commentStore'
  )
)

export default useCommentStore
