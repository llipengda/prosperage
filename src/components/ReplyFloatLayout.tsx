import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import { CommentApi, ReplyApi } from '@/api'
import {
  DEFAULT_AVATAR,
  DEFAULT_NAME,
  REPLIES_PER_PAGE
} from '@/common/constants'
import Comment from '@/components/Comment'
import CommentInput from '@/components/CommentInput'
import FloatLayout from '@/components/FloatLayout'
import Title from '@/components/Title'
import useGetByPage from '@/hooks/useGetByPage'
import useCommentStore from '@/stores/commentStore'
import useReplyStore from '@/stores/replyStore'
import TComment from '@/types/Comment'

type ReplyFloatLayoutProps = {
  /** @hint Will be injected by the useFloatLayout hook */
  onClose?: () => void
  commentId: string | number
  postId: string | number
}

const ReplyFloatLayout: React.FC<ReplyFloatLayoutProps> = ({
  onClose,
  commentId,
  postId
}) => {
  const [comment, setComment] = useState<TComment | null>(null)
  const cachedComment = useCommentStore(state =>
    state.comments.find(c => c.id === Number(commentId))
  )
  useEffect(() => {
    if (cachedComment) {
      setComment(cachedComment)
    } else {
      CommentApi.getDetail({ commentId: Number(commentId), type: 1 }).then(
        res => setComment(res as TComment)
      )
    }
  }, [cachedComment, commentId])

  const replies = useReplyStore(state => state.replies)
  const setReplies = useReplyStore(state => state.setReplies)

  const {
    get: getReplies,
    refresh,
    refreshing,
    hasMore
  } = useGetByPage(REPLIES_PER_PAGE, ReplyApi.getList, true, setReplies, {
    commentId: Number(commentId)
  })

  const updateReplies = useCommentStore(state => state.updateReplies)

  const handleSubmit = useCallback(
    async (value: string) => {
      const res = await ReplyApi.addReply({
        commentId: Number(commentId),
        content: value
      })
      setReplies(r => [...r, res] as typeof replies)
      updateReplies(Number(commentId), 1)
    },
    [commentId, setReplies, updateReplies]
  )

  if (!comment) {
    return null
  }

  return (
    <FloatLayout
      className='relative'
      title='详情'
      closeButton
      onClose={onClose}
    >
      <Comment
        className='mt-[50px]'
        id={commentId}
        postId={postId}
        avatar={comment.avatar || DEFAULT_AVATAR}
        userName={comment.name || DEFAULT_NAME}
        content={comment.content!}
        time={comment.createTime!}
        likes={comment.likes!}
        liked={comment.isLiked!}
        shares={comment.shares!}
        comments={comment.replies!}
        isInFloatLayout
        closeFloatLayout={onClose!}
      />
      <Title text='回复' className='mt-[60px]' />
      <ScrollView
        className='mt-[36px] h-[460px]'
        scrollY
        enhanced
        showScrollbar={false}
        enableFlex
        scrollWithAnimation
        refresherEnabled
        refresherTriggered={refreshing}
        onRefresherRefresh={refresh}
        onScrollToLower={hasMore ? getReplies : () => {}}
      >
        {replies.map(reply => (
          <Comment
            className='mb-[20px]'
            key={reply.id}
            id={reply.id}
            postId={postId}
            avatar={reply.avatar || DEFAULT_AVATAR}
            userName={reply.name || DEFAULT_NAME}
            content={reply.content}
            time={reply.createTime}
            likes={reply.likes}
            liked={reply.isLiked}
            isReply
          />
        ))}
        {!hasMore && (
          <View className='flex items-center justify-center h-[100px] text-[#C6C6C6]'>
            <Text>没有更多内容</Text>
          </View>
        )}
      </ScrollView>
      <CommentInput className='mx-[8px]' onSubmit={handleSubmit} />
    </FloatLayout>
  )
}

export default React.memo(ReplyFloatLayout)
