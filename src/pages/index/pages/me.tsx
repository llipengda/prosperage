import { Image, Text, View } from '@tarojs/components'
import { DEFAULT_AVATAR, DEFAULT_NAME } from '@/common/constants'
import Title from '@/components/Title'
import SettingButton from '@/components/index/SettingButton'
import useUserStore from '@/stores/userStore'
import notImplemented from '@/utils/notImplemented'
import { navigate } from '@/utils/routeTools'

export default function Me() {
  const user = useUserStore(state => ({
    name: state.name,
    avatar: state.avatar,
    verified: state.isVerified
  }))

  const handleClickContactUs = notImplemented

  return (
    <View>
      <View className='w-screen h-[520px] bg-gradient-to-b from-primary from-0% absolute top-0 z-[-1]' />
      <View className='flex items-center mt-[216px]'>
        <Image
          className='w-[180px] h-[180px] rounded-full shadow-[0_8px_24px_0_#00000040] mx-[40px]'
          src={user.avatar || DEFAULT_AVATAR}
          mode='aspectFill'
        />
        <View className='flex flex-col justify-center mt-[20px]'>
          <Text className='text-[64px] leading-[61.28px] text-white'>
            {user.name || DEFAULT_NAME}
          </Text>
          <View className='bg-primary h-[52px] w-[220px] rounded-[200px] text-center text-white mt-[20px] flex justify-center items-center'>
            <View>{user.verified ? '已实名认证' : '未实名认证'}</View>
          </View>
        </View>
      </View>
      <Title className='mx-[40px] mt-[92px]' text='个人资料管理' />
      <SettingButton
        className='mt-[48px]'
        text='管理个人资料'
        onClick={() => navigate('/pages/profile/profile')}
      />
      <Title className='mx-[40px] mt-[56px]' text='实用工具' />
      <SettingButton
        className='mt-[52px]'
        text='消费者权益保护'
        onClick={() => navigate('/pages/index/me/rights/rights')}
      />
      <SettingButton
        className='mt-[12px]'
        text='意见反馈'
        onClick={() => navigate('/pages/post/add/add?type=feedback')}
      />
      <SettingButton
        className='mt-[12px]'
        text='帮助中心'
        onClick={notImplemented}
      />
      <SettingButton
        className='mt-[12px]'
        text='关于我们'
        onClick={notImplemented}
      />
      <View
        className='mt-[68px] text-center text-[#0089FF] text-[32px] leading-[40.64px] mb-[68px]'
        onClick={handleClickContactUs}
      >
        联系我们
      </View>
    </View>
  )
}
