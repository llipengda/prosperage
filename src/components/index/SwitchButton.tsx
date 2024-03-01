import { Image, Text, View } from '@tarojs/components'

type SwitchButtonProps = {
  className?: string
  icon: string
  text: string
  checked: boolean
  onClick: (checked: boolean) => void
}

export default function SwitchButton({
  className,
  icon,
  text,
  checked,
  onClick
}: SwitchButtonProps) {
  return (
    <View
      className={`flex flex-row items-center justify-center rounded-[200px] h-[58px] min-w-[150px] ${checked ? 'bg-primary' : 'bg-[#C6C6C6]'} ${className}`}
      onClick={() => onClick(!checked)}
    >
      <Image className='w-[40px] h-[38px] ml-[-10px]' mode='aspectFit' src={icon} />
      <Text className='text-[24px] leading-[30.48px] text-white ml-[10px]'>{text}</Text>
    </View>
  )
}
