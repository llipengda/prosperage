import { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Navigate from '@/components/Navigate'
import LoginForm from '@/components/login/LoginForm'
import Logo from '@/components/login/Logo'
import useLoginStore from '@/stores/loginStore'

export default function Login() {
  const [showLogo, setShowLogo] = useState(true)
  const [showLoginForm, setShowLoginForm] = useState(true)
  const [showReceiveCode, setShowReceiveCode] = useState(false)

  const token = useLoginStore(state => state.token)

  let timer: NodeJS.Timeout
  Taro.useLoad(() => {
    const needLogin = !token
    timer = setTimeout(() => {
      setShowLogo(false)
      setShowLoginForm(needLogin)
    }, 800)
  })
  Taro.useUnload(() => clearTimeout(timer))

  const handleWechatLogin = () => {
    setShowLoginForm(false)
  }

  const handlePhoneLogin = () => {
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
        <Navigate to='/pages/login/receiveCode/receiveCode' delay={100} />
      ) : (
        <Navigate to='/pages/home/home' delay={100} />
      )}
    </View>
  )
}
