import { View } from '@tarojs/components'
import Search from '@/components/Search'

export default function Home() {
  return (
    <View>
      <View className='h-[434px] bg-primary flex flex-col'>
        <View className='text-[64px] text-white leading-[80px] ml-[40px] mt-[134px] w-[55%]'>
          让每个人的养老更美好！
        </View>
        <Search className='mx-[40px] mt-[20px]' />
      </View>
    </View>
  )
}
