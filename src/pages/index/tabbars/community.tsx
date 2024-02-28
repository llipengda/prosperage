import { View } from '@tarojs/components'
import Search from '@/components/Search'

export default function Community() {
  return (
    <View>
      <View className='h-[326px] bg-primary flex flex-col'>
        <Search className='mx-[40px] mt-[196px]' />
      </View>
    </View>
  )
}
