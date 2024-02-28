import { useState } from 'react'
import {
  type CommonEventFunction,
  Image,
  Input,
  Picker,
  type PickerSelectorProps,
  Text,
  View
} from '@tarojs/components'
import { UserApi } from '@/api'
import arrowDown from '@/assets/arrow_down.svg'
import { CALLING_CODES } from '@/common/callingCodes'
import useLoginStore from '@/stores/loginStore'
import errorModal from '@/utils/errorModal'
import notImplemented from '@/utils/notImplemented'
import throwError from '@/utils/throwError'

type LoginFormProps = {
  onWechatLogin: () => void
  onPhoneLogin: () => void
}

const LoginForm = ({ onWechatLogin, onPhoneLogin }: LoginFormProps) => {
  const [phone, setPhone] = useState('')
  const [callingCode, setCallingCode] = useState('+86')
  const [lastPickerSelected, setLastPickerSelected] = useState(
    CALLING_CODES.findIndex(item => item.phoneCode === '+86')
  )

  const setCompletePhone = useLoginStore(state => state.setPhone)
  const setToken = useLoginStore(state => state.setToken)

  const handlePickerChange: CommonEventFunction<
    PickerSelectorProps.ChangeEventDetail
  > = e => {
    setLastPickerSelected(e.detail.value as number)
    setCallingCode(CALLING_CODES[e.detail.value as number].phoneCode)
  }

  const handleClickServiceAgreement = notImplemented

  const handleClickPrivacyPolicy = notImplemented

  const handleClickContinue = async () => {
    if (phone && phone.length) {
      if (callingCode === '+86' && phone.length !== 11) {
        await errorModal('请输入正确的电话号码')
        return
      }
      setCompletePhone(callingCode + phone)
    } else {
      await errorModal('请输入正确的电话号码')
      return
    }
    onPhoneLogin()
  }

  const handleWechatLogin = async () => {
    const token =
      (await UserApi.login())?.token ??
      throwError('No token returned from login.')
    setToken(token)
    onWechatLogin()
  }

  return (
    <>
      <View className='w-4/5 flex flex-col justify-center'>
        <Text className='text-[64px] font-bold text-white'>
          欢迎使用智享盈年!
        </Text>
        <Text className='text-[48px] font-bold text-black mt-9'>
          用手机号登录
        </Text>
        <View className='flex flex-row justify-center w-full mt-4'>
          <View className='w-1/4 border-2 border-primary rounded-3xl py-2 px-3 relative'>
            <Picker
              mode='selector'
              range={CALLING_CODES.map(
                item =>
                  `${item.chineseName}(${item.countryCode}) - ${item.phoneCode}`
              )}
              value={lastPickerSelected}
              onChange={handlePickerChange}
            >
              {callingCode}
              <Image
                src={arrowDown}
                mode='aspectFit'
                className='w-[20px] h-[20px] absolute right-[20px] top-1/2 -translate-y-[50%]'
              />
            </Picker>
          </View>
          <View className='w-3/4 border-2 border-primary rounded-3xl py-2 px-4 ml-2'>
            <Input
              type='number'
              placeholder='请输入您的电话号码'
              className='w-full text-[32px]'
              onInput={e => setPhone(e.detail.value)}
            />
          </View>
        </View>
        <View
          className='rounded-3xl bg-primary text-center p-2 mt-4 text-white'
          onClick={handleClickContinue}
        >
          继续
        </View>
        <View
          className='rounded-3xl bg-[#4FA21E] text-center p-2 mt-2 text-white'
          onClick={handleWechatLogin}
        >
          使用微信账号登录
        </View>
      </View>
      <View className='absolute bottom-10'>
        <Text className='text-blue-400' onClick={handleClickServiceAgreement}>
          服务协议
        </Text>{' '}
        与{' '}
        <Text className='text-blue-400' onClick={handleClickPrivacyPolicy}>
          隐私政策
        </Text>
      </View>
    </>
  )
}

export default LoginForm
