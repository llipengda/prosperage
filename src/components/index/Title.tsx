import { View } from '@tarojs/components'

type TitleProps = {
  className?: string
  text: string
}

export default function Title({ className, text }: TitleProps) {
  return (
    <View className={`flex items-center ${className}`}>
      <View className='w-[16px] h-[42px] bg-primary' />
      <View className='text-[40px] ml-[14px] font-bold leading-[50.8px]'>{text}</View>
    </View>
  )
}
