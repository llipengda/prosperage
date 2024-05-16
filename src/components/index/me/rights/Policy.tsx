import { View, Image } from '@tarojs/components'
import arrowRight2 from '@/assets/arrow_right_2.svg'

interface PolicyProps {
  className?: string
  id: number | string
  text: string
  number: string
}

const Policy: React.FC<PolicyProps> = ({ className, id, text, number }) => {
  return (
    <View className={`h-[104px] mb-[24px] w-full relative ${className}`}>
      <View>{text}</View>
      <View className='w-full text-[#c6c6c6] text-[20px] leading-[25.4px] mt-[20px] pb-[16px] border-b-[1px] border-solid border-[#C6C6C6]'>
        {number}
      </View>
      <Image src={arrowRight2} className='absolute w-[18px] h-[32px] right-[20px] top-[50%] transform -translate-y-1/2' />
    </View>
  )
}

export default Policy
