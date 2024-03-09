import { Image, View } from '@tarojs/components'
import useStopPropagation from '@/hooks/useStopPropagation'

type RoundButtonProps = {
  className?: string
  icon: string
  onClick: () => void
}

export default function RoundButton({
  className,
  icon,
  onClick
}: RoundButtonProps) {
  const handleClick = useStopPropagation(onClick)

  return (
    <View
      className={`flex items-center justify-center w-[110px] h-[110px] rounded-full bg-primary z-10 ${className}`}
      onClick={handleClick}
    >
      <Image className='w-[64px] h-[64px]' mode='aspectFit' src={icon} />
    </View>
  )
}
