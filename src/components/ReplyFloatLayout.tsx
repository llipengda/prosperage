import React from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import { ReplyApi } from '@/api'
import {
  DEFAULT_AVATAR,
  DEFAULT_NAME,
  REPLIES_PER_PAGE
} from '@/common/constants'
import Comment, { type CommentProps } from '@/components/Comment'
import CommentInput from '@/components/CommentInput'
import FloatLayout from '@/components/FloatLayout'
import Title from '@/components/Title'
import useGetByPage from '@/hooks/useGetByPage'
import useUpdateCommentsStore from '@/stores/updateCommentsStore'

type ReplyFloatLayoutProps = {
  /** @hint Will be injected by the useFloatLayout hook */
  onClose?: () => void
} & CommentProps

const ReplyFloatLayout: React.FC<ReplyFloatLayoutProps> = ({
  onClose,
  ...comment
}) => {
  const {
    data: replies,
    setData: setReplies,
    get: getReplies,
    refresh,
    refreshing,
    hasMore
  } = useGetByPage(REPLIES_PER_PAGE, ReplyApi.getList, {
    commentId: comment.id
  })

  const updateComments = useUpdateCommentsStore(state => state.updateComments)

  const handleSubmit = async (value: string) => {
    const res = await ReplyApi.addReply({
      commentId: Number(comment.id),
      content: value
    })
    setReplies(r => [...r, res] as typeof replies)
    updateComments()
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
        {...comment}
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
            postId={comment.postId}
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
