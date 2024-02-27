import { Fragment, useEffect, useState } from 'react'
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
import logoEn from '@/assets/logo_en.svg'
import logoCn from '@/assets/logo_zh.svg'
import { CALLING_CODES } from '@/common/constants'
import useLoginStore from '@/store/loginStore'
import notImplemented from '@/utils/notImplemented'
import throwError from '@/utils/throwError'

const Logo = () => (
  <Fragment>
    <Image src={logoEn} className='w-4/5' mode='widthFix' />
    <Image src={logoCn} className='w-[30%] ml-[-50%] mt-2' mode='widthFix' />
  </Fragment>
)

const LoginForm = () => {
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

  const handleClickContinue = () => {
    if (phone) {
      setCompletePhone(callingCode + phone)
    }
    notImplemented()
  }

  const handleWechatLogin = async () => {
    const token =
      (await UserApi.login())?.token ??
      throwError('No token returned from login.')
    setToken(token)
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

export default function Login() {
  const [gradient, setGradient] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setGradient(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <View
      className={`${gradient ? 'bg-gradient-to-b from-primary to-50%' : 'bg-primary'} w-screen h-screen flex flex-col items-center justify-center transition-all duration-500 ease-in-out`}
    >
      {/* <Logo /> */}
      <LoginForm />
    </View>
  )
}
