import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import BackButton from '@/components/BackButton'

const PError = () => {
  const code = Taro.useRouter().params?.code || '404'
  const message = Taro.useRouter().params?.message || ''

  return (
    <View className='w-screen h-screen flex flex-col items-center justify-center text-primary relative bg-gradient-to-b from-primary from-0% to-20%'>
      <BackButton />
      <Text className='text-[64px] font-bold mb-[80px]'>发生了错误</Text>
      <Text className='text-[48px] font-bold mb-[30px]'>代码：{code}</Text>
      <Text className='text-[40px] mx-[40px] break-all' userSelect>
        {message}
      </Text>
    </View>
  )
}

export default PError
