import { create } from 'zustand'
import type TReply from '@/types/Reply'
import logger from '@/utils/logMiddleware'

type ReplyStore = {
  replies: TReply[]
  setReplies: {
    (replies: TReply[]): void
    (fn: (replies: TReply[]) => TReply[]): void
  }
  updateLikes: (id: number, isLiked: boolean, delta: number) => void
}

const useReplyStore = create<ReplyStore>()(
  logger(set => ({
    replies: [] as TReply[],
    setReplies: repliesOrFn => {
      if (typeof repliesOrFn === 'function') {
        set(state => ({ replies: repliesOrFn(state.replies) }))
      } else {
        set({ replies: repliesOrFn })
      }
    },
    updateLikes: (id, isLiked, delta) =>
      set(state => ({
        replies: state.replies.map(comment =>
          comment.id === id
            ? { ...comment, isLiked, likes: delta + comment.likes }
            : comment
        )
      }))
  }))
)

export default useReplyStore
