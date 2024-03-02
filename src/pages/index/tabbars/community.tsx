import { useState } from 'react'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import add from '@/assets/add.svg'
import addHollow from '@/assets/add_hollow.svg'
import earphone from '@/assets/earphone.svg'
import friend from '@/assets/friend.svg'
import hot from '@/assets/hot.svg'
import mail from '@/assets/mail.svg'
import Search from '@/components/Search'
import Post from '@/components/index/Post'
import RoundButton from '@/components/index/RoundButton'
import SwitchButton from '@/components/index/SwitchButton'
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
        scrollWithAnimation
        refresherEnabled
        refresherTriggered={refreshing}
        onRefresherRefresh={handleRefresh}
      >
        <Post
          className='mb-[32px]'
          id='1'
          userAvatar='https://api.crazyforlove.fun/static/1.jpg'
          userName='小盈'
          time='300年前'
          content='此外，为确保春节期间社会保险经办服务不断档，群众可通过海南社保医保公共服务平台、“海南医保”小程序、“海南一卡通”APP等平台快捷办理社保医保业务。如有问题可拨打12345热线咨询。'
          image='https://api.crazyforlove.fun/static/1.jpg'
          likes={100}
          comments={100}
          shares={100}
          liked
        />
        <Post
          className='mb-[32px]'
          id='2'
          userAvatar='https://api.crazyforlove.fun/static/1.jpg'
          userName='小盈'
          time='300年前'
          content='此外，为确保春节期间社会保险经办服务不断档，群众可通过海南社保医保公共服务平台、“海南医保”小程序、“海南一卡通”APP等平台快捷办理社保医保业务。如有问题可拨打12345热线咨询。'
          image='https://api.crazyforlove.fun/static/1.jpg'
          likes={100}
          comments={100}
          shares={100}
          liked
        />
        <Post
          className='mb-[32px]'
          id='3'
          userAvatar='https://api.crazyforlove.fun/static/1.jpg'
          userName='小盈'
          time='300年前'
          content='此外，为确保春节期间社会保险经办服务不断档，群众可通过海南社保医保公共服务平台、“海南医保”小程序、“海南一卡通”APP等平台快捷办理社保医保业务。如有问题可拨打12345热线咨询。'
          image='https://api.crazyforlove.fun/static/1.jpg'
          likes={100}
          comments={100}
          shares={100}
        />
      </ScrollView>
      <View className='absolute bottom-[32px] flex items-center justify-between w-screen px-[169px]'>
        <RoundButton icon={earphone} onClick={notImplemented} />
        <RoundButton icon={addHollow} onClick={notImplemented} />
        <RoundButton icon={mail} onClick={notImplemented} />
      </View>
    </View>
  )
}
