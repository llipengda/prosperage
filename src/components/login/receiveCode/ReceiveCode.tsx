import { useState } from 'react'
import { Input, Text, View } from '@tarojs/components'
import notImplemented from '@/utils/notImplemented'

export default function ReceiveCode() {
  const [focus, setFocus] = useState(true)
  const [focusIndex, setFocusIndex] = useState(0)
  const [code, setCode] = useState('')

  const handleInput = (index: number) => (value: string) => {
    if (value.length === 1) {
      setCode(code + value)
      if (index < 3) {
        setFocusIndex(index + 1)
      } else {
        setFocus(false)
      }
    } else {
      setCode(code.slice(0, -1))
      if (index > 0) {
        setFocusIndex(index - 1)
      }
    }
  }

  const handleFocus = (index: number) => () => {
    setFocus(true)
    setFocusIndex(index)
  }

  const handleConfirm = notImplemented

  const handleResend = notImplemented

  return (
    <View className='flex flex-col items-center justify-center'>
      <Text className='text-[48px] font-bold'>请输入您收到的验证码</Text>
      <Text className='text-[32px] text-[#C6C6C6] mt-[10px]'>
        在下方输入您收到的验证码
      </Text>
      <View className='flex flex-row items-center justify-between w-3/5'>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <View className='border-b-primary border-b-4 w-[20%]' key={index}>
              <Input
                type='number'
                maxlength={1}
                focus={focus && focusIndex === index}
                className='text-[160px] font-bold h-[200px] w-full text-primary font-mono'
                onInput={e => handleInput(index)(e.detail.value)}
                onFocus={handleFocus(index)}
              />
            </View>
          ))}
      </View>
      <View
        className='bg-primary rounded-3xl w-2/5 py-2 text-white text-center mt-[140px]'
        onClick={handleConfirm}
      >
        确定
      </View>
      <View className='mt-[40px] text-[32px] text-[#C6C6C6]'>
        没有收到验证码？
        <Text className='text-blue-400' onClick={handleResend}>
          重新发送
        </Text>
      </View>
    </View>
  )
}
