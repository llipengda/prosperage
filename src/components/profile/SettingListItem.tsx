import { Image, Text, View } from '@tarojs/components'
import arrowRight from '@/assets/arrow_right_2.svg'

interface SettingListItemProps {
  text: string
  value: string
  onClick: () => void
  className?: string
}

const SettingListItem: React.FC<SettingListItemProps> = ({
  text,
  value,
  onClick,
  className
}) => {
  return (
    <View
      className={`w-full mb-[20px] relative flex items-center h-[60px] border-b border-solid border-[#c6c6c6] ${className}`}
      onClick={onClick}
    >
      <View className='w-full mr-[40px] flex items-center justify-between text-[32px] leading-[40.64px] mb-[20px]'>
        <Text className='text-black'>{text}</Text>
        <Text className='text-[#c6c6c6]'>{value}</Text>
      </View>
      <View className='w-[20px] h-[32px] absolute right-0 bottom-[20px]'>
        <Image
          src={arrowRight}
          className='w-[20px] h-[32px]'
          mode='aspectFit'
        />
      </View>
    </View>
  )
}

export default SettingListItem
