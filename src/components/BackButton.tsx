import { Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import arrowLeft from '@/assets/arrow_left.svg'

type BackButtonProps = {
  className?: string
  lower?: boolean
}

const BackButton: React.FC<BackButtonProps> = ({
  className,
  lower = false
}) => {
  if (Taro.getCurrentPages().length <= 1) {
    return <></>
  }

  return (
    <Image
      src={arrowLeft}
      className={`w-[28px] h-[48px] fixed left-[40px] ${lower ? 'top-[214px]' : 'top-[140px]'} ${className}`}
      mode='aspectFit'
      onClick={() => Taro.navigateBack()}
    />
  )
}

export default BackButton
