import React, { useState } from 'react'
import { Image, Input, View } from '@tarojs/components'
import commentSelected from '@/assets/comment_selected.svg'

type CommentInputProps = {
  className?: string
  onSubmit: (content: string) => void
}

const CommentInput: React.FC<CommentInputProps> = ({ className, onSubmit }) => {
  const [value, setValue] = useState('')

  const handleConfirm = () => {
    if (value === '') {
      return
    }
    onSubmit(value)
    setValue('')
  }

  const [focus, setFocus] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  return (
    <View
      className={`fixed rounded-[100px] bg-white shadow-[0_8px_24px_0_#00000040] mx-[48px] h-[84px] flex flex-row items-center w-[calc(100vw-96px)] ${className}`}
      style={{ bottom: focus ? `${keyboardHeight + 10 || 35}Px` : '70rpx' }}
    >
      <View className='ml-[32px] mr-[34px]'>
        <Image
          className='w-[48px] h-[48px]'
          mode='aspectFit'
          src={commentSelected}
        />
      </View>
      <Input
        className='w-full mr-[32px]'
        type='text'
        value={value}
        placeholder='点击这里输入评论'
        placeholderClass='text-[32px] leading-[40.64px] text-[#c6c6c6]'
        adjustPosition={false}
        onInput={e => setValue(e.detail.value)}
        onConfirm={handleConfirm}
        onKeyboardHeightChange={e => setKeyboardHeight(e.detail.height)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </View>
  )
}

export default React.memo(CommentInput)
