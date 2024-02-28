import { View } from '@tarojs/components'
import ReceiveCode from '@/components/login/receiveCode/ReceiveCode'

export default function receiveCode() {
  return (
    <View className='bg-gradient-to-b from-primary to-20% w-screen h-screen flex flex-col items-center justify-center'>
      <ReceiveCode />
    </View>
  )
}
