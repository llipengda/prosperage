import React from 'react'
import { Image, Text, View } from '@tarojs/components'
import clock from '@/assets/clock.svg'
import comment from '@/assets/comment.svg'
import like from '@/assets/like.svg'
import likeSelected from '@/assets/like_selected.svg'
import share from '@/assets/share.svg'
import { DEFAULT_AVATAR, DEFAULT_NAME } from '@/common/constants'
import useLike from '@/hooks/useLike'
import useTime from '@/hooks/useTime'
import { navigate } from '@/utils/navigate'
import notImplemented from '@/utils/notImplemented'
import previewImage from '@/utils/previewImage'

type PostProps = {
  className?: string
  id: string | number
  userAvatar: string
  userName: string
  time: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  liked?: boolean
  clickToDetail?: boolean
}

export function Post({
  className,
  id,
  userAvatar,
  userName,
  time,
  content,
  image,
  likes: originalLikes,
  comments,
  shares,
  liked = false,
  clickToDetail = true
}: PostProps) {
  const handleClick = clickToDetail
    ? () => navigate(`/pages/post/post?id=${id}`)
    : () => {}

  const handleShare = notImplemented

  const handleComment = handleClick

  const formatTime = useTime()

  const { isLiked, likes, handleLike } = useLike(id, liked, originalLikes, 1)

  return (
    <View
      className={`flex flex-col bg-white px-[40px] pt-[40px] shadow-[0_8px_24px_0_#00000040] ${className}`}
      onClick={handleClick}
      id={`post-${id}`}
    >
      <View className='flex items-center'>
        <Image
          src={userAvatar || DEFAULT_AVATAR}
          className='w-[114px] h-[114px] rounded-full'
          mode='aspectFill'
        />
        <View className='flex flex-col ml-[20px]'>
          <Text className='text-[40px] leading-[50.8px]'>
            {userName || DEFAULT_NAME}
          </Text>
          <View className='flex items-center'>
            <Image src={clock} className='w-[20px] h-[20px]' mode='aspectFit' />
            <Text className='text-[20px] leading-[25.4px] text-[#C6C6C6] ml-[10px]'>
              {formatTime(time)}
            </Text>
          </View>
        </View>
      </View>
      <Text className='text-[32px] leading-[40.64px] mt-[40px] break-all'>
        {content}
      </Text>
      {image && (
        <Image
          src={image}
          className='h-[400px] mt-[40px]'
          mode='heightFix'
          lazyLoad
          onClick={previewImage(image)}
        />
      )}
      <View className='flex flex-row items-center justify-between mt-[40px] px-[50px] mb-[30px]'>
        <View className='flex flex-row items-center' onClick={handleShare}>
          <Image src={share} className='w-[42px] h-[42px]' mode='aspectFit' />
          <Text className='text-[20px] leading-[25.4px] ml-[10px] text-[#C6C6C6]'>
            {shares}
          </Text>
        </View>
        <View className='flex flex-row items-center' onClick={handleComment}>
          <Image src={comment} className='w-[42px] h-[42px]' mode='aspectFit' />
          <Text className='text-[20px] leading-[25.4px] ml-[10px] text-[#C6C6C6]'>
            {comments}
          </Text>
        </View>
        <View className='flex flex-row items-center' onClick={handleLike}>
          <Image
            src={isLiked ? likeSelected : like}
            className='w-[42px] h-[42px]'
            mode='aspectFit'
          />
          <Text className='text-[20px] leading-[25.4px] ml-[10px] text-[#C6C6C6]'>
            {likes}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default React.memo(Post)
