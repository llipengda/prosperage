import { Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import arrowLeft from '@/assets/arrow_left.svg'

type BackButtonProps = {
  className?: string
  lower?: boolean
  text?: string
}

const BackButton: React.FC<BackButtonProps> = ({
  className,
  text,
  lower = false
}) => {
  if (Taro.getCurrentPages().length <= 1) {
    return <></>
  }

  if (text) {
    return (
      <View
        className={`text-white text-[32px] leading-[40.64px] fixed left-[40px] z-[100] ${lower ? 'top-[219px]' : 'top-[145px]'} ${className}`}
        onClick={() => Taro.navigateBack()}
      >
        {text}
      </View>
    )
  }

  return (
    <Image
      src={arrowLeft}
      className={`w-[28px] h-[48px] fixed left-[40px] z-[100] ${lower ? 'top-[214px]' : 'top-[140px]'} ${className}`}
      mode='aspectFit'
      onClick={() => Taro.navigateBack()}
    />
  )
}

export default BackButton
