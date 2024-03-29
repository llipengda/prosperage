import React from 'react'
import { Image, Text, View } from '@tarojs/components'
import comment from '@/assets/comment.svg'
import like from '@/assets/like.svg'
import likeSelected from '@/assets/like_selected.svg'
import share from '@/assets/share.svg'
import ReplyFloatLayout from '@/components/ReplyFloatLayout'
import ShareFloatLayout from '@/components/ShareFloatLayout'
import useFloatLayout from '@/hooks/useFloatLayout'
import useLike from '@/hooks/useLike'
import useStopPropagation from '@/hooks/useStopPropagation'
import useTime from '@/hooks/useTime'
import useCommentStore from '@/stores/commentStore'
import useReplyStore from '@/stores/replyStore'
import sleep from '@/utils/sleep'

export type CommentProps = {
  className?: string
  id: string | number
  postId: string | number
  avatar: string
  userName: string
  content: string
  time: string
  likes: number
  liked: boolean
} & (
  | {
      isInFloatLayout: true
      closeFloatLayout: () => void
    }
  | {
      isInFloatLayout?: false
      closeFloatLayout?: never
    }
) &
  (
    | {
        isReply: true
        shares?: never
        comments?: never
      }
    | {
        isReply?: false
        shares: number
        comments: number
      }
  )

const Comment: React.FC<CommentProps> = ({
  id,
  postId,
  className,
  avatar,
  userName,
  content,
  time,
  shares,
  comments,
  likes,
  liked,
  isReply = false,
  isInFloatLayout = false,
  closeFloatLayout = () => {}
}) => {
  const [showShare] = useFloatLayout(
    <ShareFloatLayout id={id} type='comment' postId={postId} />
  )

  const handleShare = useStopPropagation(async () => {
    if (isInFloatLayout) {
      closeFloatLayout()
    }
    await sleep(300)
    showShare()
  })

  const [showReply] = useFloatLayout(
    <ReplyFloatLayout commentId={id} postId={postId} />
  )

  const handleComment = useStopPropagation(() => {
    if (isInFloatLayout) {
      return
    }
    showReply()
  })

  const handleClick = handleComment

  const date = useTime(true)

  const updateCommentLikes = useCommentStore(state => state.updateLikes)
  const updateReplyLikes = useReplyStore(state => state.updateLikes)

  const handleLike = useLike(
    id,
    liked,
    isReply ? 3 : 2,
    isReply ? updateReplyLikes : updateCommentLikes
  )

  return (
    <View className={`flex flex-row ${className}`} onClick={handleClick}>
      <View>
        <Image
          className='h-[94px] w-[94px] rounded-full shadow-[0_8px_24px_0_#00000040]'
          mode='aspectFill'
          src={avatar}
        />
      </View>
      <View className='flex flex-col pl-[14px] w-full'>
        <Text className='text-[32px] leading-[40.64px]'>{userName}</Text>
        <Text className='text-[28px] leading-[30.48px] mt-[8px] break-all'>
          {content}
        </Text>
        <View className='flex flex-row items-center mt-[40px] justify-between'>
          <Text className='text-[20px] leading-[25.4px] text-[#c6c6c6]'>
            发布时间 {date(time)}
          </Text>
          <View className='flex flex-row items-center'>
            {!isReply && (
              <>
                <View
                  className='flex flex-row items-center mr-[18px]'
                  onClick={handleShare}
                >
                  <Image
                    src={share}
                    className='w-[28px] h-[26px]'
                    mode='aspectFit'
                  />
                  <Text className='text-[20px] leading-[25.4px] ml-[10px] text-[#C6C6C6]'>
                    {shares}
                  </Text>
                </View>
                <View
                  className='flex flex-row items-center mr-[18px]'
                  onClick={handleComment}
                >
                  <Image
                    src={comment}
                    className='w-[28px] h-[26px]'
                    mode='aspectFit'
                  />
                  <Text className='text-[20px] leading-[25.4px] ml-[10px] text-[#C6C6C6]'>
                    {comments}
                  </Text>
                </View>
              </>
            )}
            <View className='flex flex-row items-center' onClick={handleLike}>
              <Image
                src={liked ? likeSelected : like}
                className='w-[28px] h-[26px]'
                mode='aspectFit'
              />
              <Text className='text-[20px] leading-[25.4px] ml-[10px] text-[#C6C6C6]'>
                {likes}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default React.memo(Comment)
