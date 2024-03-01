import { Image, Text, View } from '@tarojs/components'

type IconButtonProps = {
  className?: string
  icon: string
  text: string
  onClick: () => void
}

export default function IconButton({
  className,
  icon,
  text,
  onClick
}: IconButtonProps) {
  return (
    <View className={`flex flex-col items-center justify-center ${className}`}>
      <View
        className='h-[110px] w-[110px] rounded-full bg-gradient-to-b from-primary from-0% flex items-center justify-center'
        onClick={onClick}
      >
        <Image className='h-[70px] w-[70px]' src={icon} mode='aspectFill' />
      </View>
      <Text className='text-[20px] leading-[25.4px] mt-[16px]'>{text}</Text>
    </View>
  )
}
