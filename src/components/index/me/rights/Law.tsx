import { Image, View } from '@tarojs/components'

interface LawProps {
  className?: string
  title: string
  img: string
}

const Law: React.FC<LawProps> = ({ className, title, img }) => {
  return (
    <View className={`w-[264px] h-[414px] ${className}`}>
      <Image src={img} className='w-[264px] h-[370px]' mode='aspectFill' />
      <View className='text-black text-[32px] leading-[40.64px] font-bold'>
        {title}
      </View>
    </View>
  )
}

export default Law
