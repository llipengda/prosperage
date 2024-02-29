import { useState } from 'react'
import {
  Image,
  SwiperItem,
  Swiper as TaroSwiper,
  View
} from '@tarojs/components'

type SwiperProps = {
  className?: string
  images: string[]
}

export default function Swiper({ className, images }: SwiperProps) {
  const [active, setActive] = useState(0)

  return (
    <View className={`${className} relative`}>
      <TaroSwiper
        className='h-[408px] shadow-[0_8px_24px_0_#0000001A] rounded-[30px] overflow-hidden'
        autoplay
        circular
        onChange={e => setActive(e.detail.current)}
      >
        {images.map((image, index) => (
          <SwiperItem key={index}>
            <Image className='w-full h-full' mode='aspectFill' src={image} />
          </SwiperItem>
        ))}
      </TaroSwiper>
      <View className='absolute right-[32px] top-[368px] flex justify-center'>
        {images.map((_, index) => (
          <View
            key={index}
            className={`w-[18px] h-[18px] rounded-full mx-[5px] ${
              active === index ? 'bg-primary' : 'bg-[#D9D9D9]'
            }`}
          />
        ))}
      </View>
    </View>
  )
}
