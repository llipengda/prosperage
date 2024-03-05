import { Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import arrowLeft from '@/assets/arrow_left.svg'

type BackButtonProps = {
  className?: string
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  if (Taro.getCurrentPages().length <= 1) {
    return <></>
  }

  return (
    <Image
      src={arrowLeft}
      className={`w-[28px] h-[48px] absolute left-[40px] top-[140px] ${className}`}
      mode='aspectFit'
      onClick={() => Taro.navigateBack()}
    />
  )
}

export default BackButton
