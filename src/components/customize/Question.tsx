import React from 'react'
import { Text, View } from '@tarojs/components'
import Title from '@/components/Title'

type QuestionProps = {
  className?: string
  questionId: number
  title: string
  text: string
  selections: string[]
  selected: number
  onSelect: (questionId: number, selectionIndex: number) => void
}

const Question: React.FC<QuestionProps> = ({
  className,
  questionId,
  title,
  text,
  selections,
  selected,
  onSelect
}) => {
  return (
    <View className={`flex flex-col ${className}`}>
      <Title text={title} />
      <View className='text-[32px] leading-[40.64px] font-bold mt-[30px]'>
        {text}
      </View>
      {selections.map((selection, index) => (
        <View
          className='flex-rol flex mx-[30px] mt-[30px] items-center cursor-pointer'
          key={index}
          onClick={() => onSelect(questionId, index)}
        >
          <View
            className={`h-[30px] w-[30px] ${selected === index ? 'bg-primary' : 'bg-[#c6c6c6]'} rounded-full`}
          />
          <Text className='text-[32px] leading-[40.64px] ml-[10px]'>
            {selection}
          </Text>
        </View>
      ))}
    </View>
  )
}

export default React.memo(Question)
