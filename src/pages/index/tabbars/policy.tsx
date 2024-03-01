import { View } from '@tarojs/components'
import Search from '@/components/Search'
import Title from '@/components/index/Title'

export default function Policy() {
  return (
    <View>
      <View className='h-[704px] bg-primary flex flex-col'>
        <View className='text-[64px] text-white leading-[80px] ml-[40px] mt-[402px] w-[55%] font-bold'>
          让每个人的养老更美好！
        </View>
        <Search className='mx-[40px] mt-[20px]' />
      </View>
      <View className='flex flex-col w-screen'>
        <Title className='mt-[56px] mx-[40px]' text='相关咨询' />
      </View>
    </View>
  )
}
