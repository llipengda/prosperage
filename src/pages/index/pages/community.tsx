import { useMemo } from 'react'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import { PostApi } from '@/api'
import add from '@/assets/add.svg'
import addHollow from '@/assets/add_hollow.svg'
import earphone from '@/assets/earphone.svg'
import friend from '@/assets/friend.svg'
import hot from '@/assets/hot.svg'
import mail from '@/assets/mail.svg'
import { POSTS_PER_PAGE } from '@/common/constants'
import Post from '@/components/Post'
import Search from '@/components/Search'
import RoundButton from '@/components/index/RoundButton'
import SwitchButton from '@/components/index/SwitchButton'
import useGetByPage from '@/hooks/useGetByPage'
import useSwitch from '@/hooks/useSwitch'
import usePostStore from '@/stores/postStore'
import notImplemented from '@/utils/notImplemented'
import { navigate } from '@/utils/routeTools'

export default function Community() {
  const posts = usePostStore(state => state.posts)
  const setPosts = usePostStore(state => state.setPosts)

  const [
    { get: getPosts, hasMore, loading, refreshing, refresh },
    checkedIndex,
    switchTo
  ] = useSwitch(
    useGetByPage(POSTS_PER_PAGE, PostApi.getList, false, setPosts, {
      orderByPopularity: false
    }),
    useGetByPage(POSTS_PER_PAGE, PostApi.getFriendsPost, false, setPosts)
  )

  const handleClickSwitch = switchTo

  const handleClickFriendCircle = notImplemented

  const handleClickEarphone = notImplemented

  const handleClickAdd = () => navigate('/pages/post/add/add')

  const handleClickMail = notImplemented

  return (
    <View className='relative'>
      <View className='h-[326px] bg-primary flex flex-col'>
        <Search className='mx-[40px] mt-[196px]' />
      </View>
      {useMemo(
        () => (
          <View className='flex flex-row box-border py-[40px] px-[40px] bg-white sticky top-0'>
            <SwitchButton
              index={0}
              icon={hot}
              text='热门'
              activeIndex={checkedIndex}
              onClick={handleClickSwitch}
            />
            <SwitchButton
              index={1}
              className='ml-[42px]'
              icon={friend}
              text='好友'
              activeIndex={checkedIndex}
              onClick={handleClickSwitch}
            />
            <View
              className='absolute right-[40px] top-[50px] flex items-center justify-center'
              onClick={handleClickFriendCircle}
            >
              <Image className='w-[40px] h-[40px]' mode='aspectFit' src={add} />
              <Text className='text-[24px] leading-[30.48px] text-primary text-center ml-[10px]'>
                好友圈
              </Text>
            </View>
          </View>
        ),
        [checkedIndex, handleClickFriendCircle, handleClickSwitch]
      )}
      <ScrollView
        className='flex flex-col w-screen h-[calc(100vh-484px-env(safe-area-inset-bottom)-142px-5px)] pt-[20px]'
        scrollY
        enhanced
        showScrollbar={false}
        enableFlex
        scrollWithAnimation
        refresherEnabled
        refresherTriggered={refreshing}
        onRefresherRefresh={refresh}
        onScrollToLower={getPosts}
      >
        {posts.map(post => (
          <Post
            className='mb-[32px]'
            key={post.id}
            id={post.id}
            userAvatar={post.avatar}
            userName={post.name}
            time={post.updateTime}
            content={post.content}
            image={post.image}
            likes={post.likes}
            comments={post.comments}
            shares={post.shares}
            liked={post.isLiked}
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
      <View className='absolute bottom-[32px] flex items-center justify-between w-screen px-[169px]'>
        <RoundButton icon={earphone} onClick={handleClickEarphone} />
        <RoundButton icon={addHollow} onClick={handleClickAdd} />
        <RoundButton icon={mail} onClick={handleClickMail} />
      </View>
    </View>
  )
}
