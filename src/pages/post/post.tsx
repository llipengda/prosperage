import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { PostApi } from '@/api'
import BackButton from '@/components/BackButton'
import Navigate from '@/components/Navigate'
import { Post } from '@/components/Post'
import type TPost from '@/types/Post'

const PPost = () => {
  const id = Taro.useRouter().params?.id

  const [post, setPost] = useState<TPost | null>(null)

  useEffect(() => {
    if (!id) {
      return
    }
    PostApi.getDetail({ postId: Number(id) }).then(res => setPost(res as TPost))
  }, [id])

  if (!id) {
    return (
      <Navigate to='/pages/error/error?code=404&message=帖子不存在' redirect />
    )
  }

  return (
    <View>
      <View className='h-[406px] w-screen bg-gradient-to-b from-primary from-0% relative'>
        <BackButton />
      </View>
      {post && (
        <Post
          className='shadow-none'
          id={id}
          userAvatar={post.avatar}
          userName={post.name}
          content={post.content}
          time={post.updateTime}
          likes={post.likes}
          liked={post.isLiked}
          comments={post.comments}
          shares={post.shares}
          image={post.image}
        />
      )}
    </View>
  )
}

export default PPost
