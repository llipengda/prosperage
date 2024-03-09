import React from 'react'
import { Button, Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { PostApi } from '@/api'
import communityFriends from '@/assets/community_friends.svg'
import link from '@/assets/link.svg'
import wechat from '@/assets/wechat.svg'
import FloatLayout from '@/components/FloatLayout'
import TextButton from '@/components/TextButton'
import errorModal from '@/utils/errorModal'
import sleep from '@/utils/sleep'

interface ShareFloatLayoutProps {
  /** @hint Will be injected */
  onClose?: () => void
  id: string | number
}

function ShareFloatLayout({ onClose = () => {}, id }: ShareFloatLayoutProps) {
  const handleShareCommunityFriends = async () => {
    console.log('share to community friends', id)
    PostApi.share({ postId: Number(id) })
    await Taro.showToast({ title: '分享成功', icon: 'success', duration: 500 })
    await sleep(500)
    onClose()
  }

  Taro.useShareAppMessage(() => {
    return {
      title: '好友分享了帖子 - 智享盈年',
      path: `/pages/post/post?id=${id}`
    }
  })

  const handleCopyLink = async () => {
    await errorModal('此功能仅企业版小程序支持！')
    onClose()
  }

  return (
    <FloatLayout title='转发到' onClose={onClose}>
      <View className='flex flex-row items-center justify-between mt-[60px] mx-[20px]'>
        <View
          className='flex flex-col items-center justify-center'
          onClick={handleShareCommunityFriends}
        >
          <Image
            src={communityFriends}
            className='w-[80px] h-[80px]'
            mode='aspectFit'
          />
          <View className='text-[20px] leading-[25.4px] mt-[20px]'>
            社区好友
          </View>
        </View>
        <View className='flex flex-col items-center justify-center relative'>
          <Image src={wechat} className='w-[80px] h-[80px]' mode='aspectFit' />
          <View className='text-[20px] leading-[25.4px] mt-[20px]'>
            微信好友
          </View>
          <Button
            openType='share'
            className='absolute w-full h-full inset-0 opacity-0'
            onClick={onClose}
          />
        </View>
        <View
          className='flex flex-col items-center justify-center'
          onClick={handleCopyLink}
        >
          <Image src={link} className='w-[80px] h-[80px]' mode='aspectFit' />
          <View className='text-[20px] leading-[25.4px] mt-[20px]'>
            复制链接
          </View>
        </View>
      </View>
      <TextButton text='取消' className='my-[80px] mx-auto' onClick={onClose} />
    </FloatLayout>
  )
}

export default React.memo(ShareFloatLayout)
