import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import BackButton from '@/components/BackButton'
import Navigate from '@/components/Navigate'

const PPost = () => {
  const id = Taro.useRouter().params?.id

  if (!id) {
    return (
      <Navigate to='/pages/error/error?code=404&message=帖子不存在' redirect />
    )
  }

  console.log('Post id:', id)

  return (
    <View>
      <View className='h-[406px] w-screen bg-gradient-to-b from-primary from-0% relative'>
        <BackButton />
      </View>
    </View>
  )
}

export default PPost
