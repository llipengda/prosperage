import { View } from '@tarojs/components'
import Search from '@/components/Search'

export default function Policy() {
  return (
    <View>
      <View className='h-[704px] bg-primary flex flex-col'>
        <View className='text-[64px] text-white leading-[80px] ml-[40px] mt-[402px] w-[55%] font-bold'>
          让每个人的养老更美好！
        </View>
        <Search className='mx-[40px] mt-[20px]' />
      </View>
    </View>
  )
}
