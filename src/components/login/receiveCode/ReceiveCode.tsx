import { useState } from 'react'
import { Input, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { UserApi } from '@/api'
import useThrottle from '@/hooks/useThrottle'
import useLoginStore from '@/stores/loginStore'

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

  const handleConfirm = async () => {
    const res = await UserApi.verify({ phone, code })
    if (res?.correct) {
      Taro.showModal({
        title: '提示',
        content: '登录成功但是后续怎么办还没有写（）',
        showCancel: false
      }) // TODO login by phone
    } else {
      Taro.showModal({
        title: '提示',
        content: '验证码错误',
        showCancel: false
      })
    }
  }

  const [resend, time] = useThrottle(UserApi.send, 300, false)
  const phone = useLoginStore(state => state.phone)!

  const handleResend = async () => {
    if (time > 0) {
      return
    }
    const res = await resend({ phone })
    if (res?.success) {
      Taro.showModal({
        title: '提示',
        content: '验证码发送成功',
        showCancel: false
      })
    } else {
      Taro.showModal({
        title: '提示',
        content: '验证码发送失败',
        showCancel: false
      })
    }
  }

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
        <Text
          className={`${time > 0 ? 'text-[#c6c6c6]' : 'text-blue-400'}`}
          onClick={handleResend}
        >
          {time > 0 ? `${time}s后` : ''}重新发送
        </Text>
      </View>
    </View>
  )
}
