import { View } from '@tarojs/components'
import BackButton from '@/components/BackButton'
import NavigationBarTitle from '@/components/NavigationBarTitle'
import Title from '@/components/Title'

const Rights = () => {
  return (
    <View>
      <View className='bg-gradient-to-b from-primary from-0% h-[406px] w-screen' />
      <NavigationBarTitle text='消费者权益保护' lower />
      <BackButton lower />
      <View className='px-[40px]'>
        <Title text='金融消费者权益保护' />
        <Title text='相关文件' />
      </View>
    </View>
  )
}

export default Rights
