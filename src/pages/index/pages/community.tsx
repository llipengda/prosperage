import { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import { PostApi } from '@/api'
import add from '@/assets/add.svg'
import addHollow from '@/assets/add_hollow.svg'
import earphone from '@/assets/earphone.svg'
import friend from '@/assets/friend.svg'
import hot from '@/assets/hot.svg'
import mail from '@/assets/mail.svg'
import Post from '@/components/Post'
import Search from '@/components/Search'
import RoundButton from '@/components/index/RoundButton'
import SwitchButton from '@/components/index/SwitchButton'
import type TPost from '@/types/Post'
import notImplemented from '@/utils/notImplemented'
import sleep from '@/utils/sleep'

export default function Community() {
  const [checked, setChecked] = useState(0)

  const handleClickSwitch = (index: number) => () => {
    setChecked(index)
  }

  const handleClickFriendCircle = notImplemented

  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await sleep(2000)
    setRefreshing(false)
  }

  const [posts, setPosts] = useState<TPost[]>([])

  const pageIndex = useRef(0)

  useEffect(() => {
    PostApi.getList({
      page: pageIndex.current,
      pageSize: 15,
      orderByPopularity: false
    }).then(res => setPosts(res as TPost[]))
  }, [])

  return (
    <View className='relative'>
      <View className='h-[326px] bg-primary flex flex-col'>
        <Search className='mx-[40px] mt-[196px]' />
      </View>
      <View className='flex flex-row box-border py-[40px] px-[40px] bg-white sticky top-0'>
        <SwitchButton
          icon={hot}
          text='热门'
          checked={checked === 0}
          onClick={handleClickSwitch(0)}
        />
        <SwitchButton
          className='ml-[42px]'
          icon={friend}
          text='好友'
          checked={checked === 1}
          onClick={handleClickSwitch(1)}
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
      <ScrollView
        className='flex flex-col w-screen h-[calc(100vh-484px-env(safe-area-inset-bottom)-142px-5px)] pt-[20px]'
        scrollY
        enhanced
        showScrollbar={false}
        enableFlex
        scrollWithAnimation
        refresherEnabled
        refresherTriggered={refreshing}
        onRefresherRefresh={handleRefresh}
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
      </ScrollView>
      <View className='absolute bottom-[32px] flex items-center justify-between w-screen px-[169px]'>
        <RoundButton icon={earphone} onClick={notImplemented} />
        <RoundButton icon={addHollow} onClick={notImplemented} />
        <RoundButton icon={mail} onClick={notImplemented} />
      </View>
    </View>
  )
}
