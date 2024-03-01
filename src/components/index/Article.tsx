import { Image, View } from '@tarojs/components'
import _maxLength from '@/utils/maxLength'

type ArticleProps = {
  image: string
  title: string
  content: string
  className?: string
  imageClassName?: string
  maxLength?: number
  onClick: () => void
}

export default function Article({
  image,
  title,
  content,
  className,
  imageClassName,
  maxLength = 35,
  onClick
}: ArticleProps) {
  return (
    <View
      className={`flex h-[178px] border border-primary rounded-[30px] ${className}`}
      onClick={onClick}
    >
      <Image
        className={`w-[212px] h-[162px] rounded-[30px] my-[8px] ml-[8px] ${imageClassName}`}
        mode='aspectFill'
        src={image}
      />
      <View className='flex flex-col w-[442px] ml-[14px] mr-[24px] justify-around'>
        <View className='text-[32px] leading-[40.6px] font-bold'>{title}</View>
        <View className='text-[20px] leading-[25.4px] text-[#C6C6C6]'>
          {_maxLength(maxLength)(content)}
        </View>
      </View>
    </View>
  )
}
