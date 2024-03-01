import { useState } from 'react'
import { Image, Text, View } from '@tarojs/components'
import add from '@/assets/add.svg'
import friend from '@/assets/friend.svg'
import hot from '@/assets/hot.svg'
import Search from '@/components/Search'
import Post from '@/components/index/Post'
import SwitchButton from '@/components/index/SwitchButton'
import notImplemented from '@/utils/notImplemented'

export default function Community() {
  const [checked, setChecked] = useState(0)

  const handleClickSwitch = (index: number) => () => {
    setChecked(index)
  }

  const handleClickFriendCircle = notImplemented

  return (
    <View>
      <View className='h-[326px] bg-primary flex flex-col'>
        <Search className='mx-[40px] mt-[196px]' />
      </View>
      <View className='flex flex-row mt-[40px] mx-[40px] relative'>
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
          className='absolute right-0 top-[10px] flex items-center justify-center'
          onClick={handleClickFriendCircle}
        >
          <Image className='w-[40px] h-[40px]' mode='aspectFit' src={add} />
          <Text className='text-[24px] leading-[30.48px] text-primary text-center ml-[10px]'>
            好友圈
          </Text>
        </View>
      </View>
      <View className='flex flex-col w-screen mt-[60px]'>
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
      </View>
    </View>
  )
}
