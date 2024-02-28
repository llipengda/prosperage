import { Image, View } from '@tarojs/components'
import logoEn from '@/assets/logo_en.svg'
import logoCn from '@/assets/logo_zh.svg'

const Logo = () => (
  <View className='flex flex-col items-center justify-center w-full'>
    <Image src={logoEn} className='w-4/5' mode='widthFix' />
    <Image src={logoCn} className='w-[30%] ml-[-50%] mt-2' mode='widthFix' />
  </View>
)

export default Logo
