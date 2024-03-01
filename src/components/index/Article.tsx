import { Image, View } from '@tarojs/components'
import maxLength from '@/utils/maxLength'

type ArticleProps = {
  image: string
  title: string
  content: string
  className?: string
}

export default function Article({
  image,
  title,
  content,
  className
}: ArticleProps) {
  return (
    <View
      className={`flex h-[178px] border border-primary rounded-[30px] ${className}`}
    >
      <Image
        className='w-[212px] h-[162px] rounded-[30px] my-[8px] ml-[8px]'
        mode='aspectFill'
        src={image}
      />
      <View className='flex flex-col w-[442px] ml-[14px] mr-[24px] justify-around'>
        <View className='text-[32px] leading-[40.6px] font-bold'>{title}</View>
        <View className='text-[20px] leading-[25.4px] text-[#C6C6C6]'>
          {maxLength(35)(content)}
        </View>
      </View>
    </View>
  )
}
