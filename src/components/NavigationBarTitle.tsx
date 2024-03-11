import { View } from '@tarojs/components'

type NavigationBarTitleProps = {
  text: string
  className?: string
  lower?: boolean
}

const NavigationBarTitle: React.FC<NavigationBarTitleProps> = ({
  text,
  className,
  lower = false
}) => {
  return (
    <View
      className={`fixed text-[48px] leading-[60.96px] ${lower ? 'top-[214px]' : 'top-[140px]'} w-screen text-center text-white font-bold ${className}`}
    >
      {text}
    </View>
  )
}

export default NavigationBarTitle
