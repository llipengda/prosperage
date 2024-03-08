import { View } from '@tarojs/components'

type NavigationBarTitleProps = {
  text: string
  className?: string
}

const NavigationBarTitle: React.FC<NavigationBarTitleProps> = ({
  text,
  className
}) => {
  return (
    <View
      className={`fixed text-[48px] leading-[60.96px] top-[140px] w-screen text-center text-white font-bold ${className}`}
    >
      {text}
    </View>
  )
}

export default NavigationBarTitle
