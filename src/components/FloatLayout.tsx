import React from 'react'
import { Image, View } from '@tarojs/components'
import close from '@/assets/close.svg'

interface FloatLayoutProps {
  className?: string
  children?: React.ReactNode
  title: string
  onClose?: () => void
  closeButton?: boolean
}

const FloatLayout: React.FC<FloatLayoutProps> = ({
  className,
  title,
  children,
  onClose = () => {},
  closeButton = false
}) => {
  return (
    <View className={`relative m-[40px] ${className}`}>
      <View className='font-bold text-[64px] leading-[60.96px]'>{title}</View>
      <View className='absolute top-0 right-0' onClick={onClose}>
        {closeButton && (
          <Image src={close} mode='aspectFit' className='w-[54px] h-[54px]' />
        )}
      </View>
      <View>{children}</View>
    </View>
  )
}

export default React.memo(FloatLayout)
