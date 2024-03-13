import { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { UserApi } from '@/api'
import Navigate from '@/components/Navigate'
import LoginForm from '@/components/login/LoginForm'
import Logo from '@/components/login/Logo'
import useLoginStore from '@/stores/loginStore'
import useTabBarStore from '@/stores/tabBarStore'

export default function Login() {
  const [showLogo, setShowLogo] = useState(true)
  const [showLoginForm, setShowLoginForm] = useState(true)
  const [showReceiveCode, setShowReceiveCode] = useState(false)

  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const token = useLoginStore(state => state.token)

  const active = useTabBarStore(state => state.active)

  Taro.useLoad(() => {
    const needLogin = !token
    setTimer(
      setTimeout(() => {
        setShowLogo(false)
        setShowLoginForm(needLogin)
      }, 800)
    )
  })

  Taro.useUnload(() => clearTimeout(timer))

  Taro.useDidHide(() => {
    if (!showReceiveCode) return
    setShowLogo(false)
    setShowLoginForm(true)
    setShowReceiveCode(false)
  })

  const handleWechatLogin = () => {
    setShowLoginForm(false)
  }

  const handlePhoneLogin = async (phone: string) => {
    const res = await UserApi.send({ phone })
    if (!res?.success) {
      if (phone.startsWith('+86')) {
        await Taro.showModal({
          title: '提示',
          content: res?.msg || '发送验证码失败',
          showCancel: false
        })
      }
    }
    setShowLoginForm(false)
    setShowReceiveCode(true)
  }

  return (
    <View
      className={`${showLogo ? 'bg-primary' : showLoginForm ? 'bg-gradient-to-b from-primary to-50%' : showReceiveCode ? 'bg-gradient-to-b from-primary to-20%' : 'bg-white'} w-screen h-screen flex flex-col items-center justify-center transition-all duration-500 ease-in-out`}
    >
      {showLogo ? (
        <Logo />
      ) : showLoginForm ? (
        <LoginForm
          onWechatLogin={handleWechatLogin}
          onPhoneLogin={handlePhoneLogin}
        />
      ) : showReceiveCode ? (
        <Navigate to='/pages/login/code/code' delay={200} />
      ) : (
        <Navigate
          to={`/pages/index/index?tab=${active}`}
          delay={200}
          redirect
        />
      )}
    </View>
  )
}
