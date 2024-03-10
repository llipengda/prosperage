import { useCallback, useEffect, useState } from 'react'
import { ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
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
import useUpdateComments from '@/hooks/useUpdateComments'
import useUpdatePostsStore from '@/stores/updatePostsStore'
import type TComment from '@/types/Comment'
import type TPost from '@/types/Post'

const PPost = () => {
  const id = Taro.useRouter().params?.id

  const [post, setPost] = useState<TPost | null>(null)

  const shouldUpdatePost = useUpdatePostsStore(state => state.update)

  useEffect(() => {
    if (!id) {
      return
    }
    PostApi.getDetail({ postId: Number(id) }).then(res => setPost(res as TPost))
  }, [id, shouldUpdatePost])

  const {
    data: comments,
    setData: setComments,
    get: getComments,
    loading,
    refresh,
    refreshing,
    hasMore
  } = useGetByPage(COMMENTS_PER_PAGE, CommentApi.getList, {
    objId: Number(id),
    type: 1
  })

  useUpdateComments(refresh)

  const updatePosts = useUpdatePostsStore(state => state.updatePosts)

  const handleSubmitComment = useCallback(
    async (value: string) => {
      const comment = (await CommentApi.comment({
        type: 1,
        objId: Number(id),
        content: value
      })) as TComment
      setComments(c => [...c, comment])
      updatePosts()
    },
    [id, setComments, updatePosts]
  )

  if (!id) {
    return (
      <Navigate to='/pages/error/error?code=404&message=帖子不存在' redirect />
    )
  }

  return (
    <View className='relative'>
      <View className='h-[406px] w-screen bg-gradient-to-b from-primary from-0%' />
      <BackButton className='top-[214px]' />
      <Post
        className='shadow-none'
        id={id}
        userAvatar={post?.avatar || DEFAULT_AVATAR}
        userName={post?.name || DEFAULT_NAME}
        content={post?.content || '加载中'}
        time={post?.updateTime || Date.now().toString()}
        likes={post?.likes || 0}
        liked={post?.isLiked}
        comments={post?.comments || 0}
        shares={post?.shares || 0}
        image={post?.image}
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
        refresherEnabled
        refresherTriggered={refreshing}
        onRefresherRefresh={refresh}
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
