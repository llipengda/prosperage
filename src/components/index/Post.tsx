import React, { useState } from 'react'
import { type ITouchEvent, Image, Text, View } from '@tarojs/components'
import clock from '@/assets/clock.svg'
import comment from '@/assets/comment.svg'
import like from '@/assets/like.svg'
import likeSelected from '@/assets/like_selected.svg'
import share from '@/assets/share.svg'
import notImplemented from '@/utils/notImplemented'
import previewImage from '@/utils/previewImage'

type PostProps = {
  className?: string
  id: string
  userAvatar: string
  userName: string
  time: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  liked?: boolean
}

export function Post({
  className,
  id,
  userAvatar,
  userName,
  time,
  content,
  image,
  likes,
  comments,
  shares,
  liked: _liked = false
}: PostProps) {
  const [liked, setLiked] = useState(_liked)
  const [addLike, setAddLike] = useState(0)

  const handleClick = notImplemented

  const handleShare = notImplemented

  const handleComment = notImplemented

  const handleLike = (e: ITouchEvent) => {
    e.stopPropagation()
    setLiked(!liked)
    setAddLike(_liked ? (liked ? -1 : 0) : liked ? 0 : 1)
  }

  return (
    <View
      className={`flex flex-col bg-white px-[40px] pt-[40px] shadow-[0_8px_24px_0_#00000040] ${className}`}
      onClick={handleClick}
      id={`post-${id}`}
    >
      <View className='flex items-center'>
        <Image
          src={userAvatar}
          className='w-[114px] h-[114px] rounded-full'
          mode='aspectFill'
        />
        <View className='flex flex-col ml-[20px]'>
          <Text className='text-[40px] leading-[50.8px]'>{userName}</Text>
          <View className='flex items-center'>
            <Image src={clock} className='w-[20px] h-[20px]' mode='aspectFit' />
            <Text className='text-[20px] leading-[25.4px] text-[#C6C6C6] ml-[10px]'>
              {time}
            </Text>
          </View>
        </View>
      </View>
      <Text className='text-[32px] leading-[40.64px] mt-[40px]'>{content}</Text>
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
            src={liked ? likeSelected : like}
            className='w-[42px] h-[42px]'
            mode='aspectFit'
          />
          <Text className='text-[20px] leading-[25.4px] ml-[10px] text-[#C6C6C6]'>
            {likes + addLike}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default React.memo(Post)
