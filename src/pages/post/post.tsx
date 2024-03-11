import { useCallback, useEffect, useState } from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import Taro, { useReachBottom } from '@tarojs/taro'
import { CommentApi, PostApi } from '@/api'
import {
  COMMENTS_PER_PAGE,
  DEFAULT_AVATAR,
  DEFAULT_NAME
} from '@/common/constants'
import BackButton from '@/components/BackButton'
import Comment from '@/components/Comment'
import CommentInput from '@/components/CommentInput'
import Navigate from '@/components/Navigate'
import { Post } from '@/components/Post'
import Title from '@/components/Title'
import useGetByPage from '@/hooks/useGetByPage'
import useCommentStore from '@/stores/commentStore'
import usePostStore from '@/stores/postStore'
import type TComment from '@/types/Comment'
import type TPost from '@/types/Post'

const PPost = () => {
  const id = Taro.useRouter().params?.id

  const [post, setPost] = useState<null | TPost>(null)

  const cachedPost = usePostStore(state =>
    state.posts.find(p => p.id === Number(id))
  )

  useEffect(() => {
    if (cachedPost) {
      setPost(cachedPost)
    } else {
      PostApi.getDetail({ postId: Number(id) }).then(res =>
        setPost(res as TPost)
      )
    }
  }, [cachedPost, id])

  const comments = useCommentStore(state => state.comments)
  const setComments = useCommentStore(state => state.setComments)

  const {
    get: getComments,
    loading,
    hasMore
  } = useGetByPage(COMMENTS_PER_PAGE, CommentApi.getList, true, setComments, {
    objId: Number(id),
    type: 1
  })

  useReachBottom(getComments)

  const updatePostComments = usePostStore(state => state.updateComments)

  const handleSubmitComment = useCallback(
    async (value: string) => {
      const comment = (await CommentApi.comment({
        type: 1,
        objId: Number(id),
        content: value
      })) as TComment
      setComments(c => [...c, comment])
      updatePostComments(Number(id), 1)
    },
    [id, setComments, updatePostComments]
  )

  if (!id) {
    return (
      <Navigate to='/pages/error/error?code=404&message=帖子不存在' redirect />
    )
  }

  if (!post) {
    return null
  }

  return (
    <View className='relative'>
      <View className='h-[406px] w-screen bg-gradient-to-b from-primary from-0%' />
      <BackButton lower />
      <Post
        className='shadow-none'
        id={id}
        userAvatar={post.avatar || DEFAULT_AVATAR}
        userName={post.name || DEFAULT_NAME}
        content={post.content || '加载中'}
        time={post.updateTime || Date.now().toString()}
        likes={post.likes || 0}
        liked={post.isLiked}
        comments={post.comments || 0}
        shares={post.shares || 0}
        image={post.image}
        clickToDetail={false}
      />
      <Title text='评论' className='mt-[70px] mx-[48px]' />
      <ScrollView
        className='mt-[48px]'
        scrollY
        enhanced
        showScrollbar={false}
        enableFlex
        scrollWithAnimation
        onScrollToLower={hasMore ? getComments : () => {}}
      >
        {comments.map(comment => (
          <Comment
            id={comment.id}
            postId={id}
            key={comment.id}
            className='mx-[48px] mb-[20px]'
            avatar={DEFAULT_AVATAR}
            userName={DEFAULT_NAME}
            content={comment.content}
            time={comment.createTime}
            shares={comment.shares}
            comments={comment.replies}
            likes={comment.likes}
            liked={comment.isLiked}
          />
        ))}
        {!hasMore && (
          <View className='flex items-center justify-center h-[100px] text-[#C6C6C6]'>
            <Text>没有更多内容</Text>
          </View>
        )}
        {loading && (
          <View className='flex items-center justify-center h-[100px] text-[#C6C6C6]'>
            <Text>加载中...</Text>
          </View>
        )}
      </ScrollView>
      <View className='h-[174px]' />
      <CommentInput onSubmit={handleSubmitComment} />
    </View>
  )
}

export default PPost
