import { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import { inteprecitor } from '@/utils/inteprecitor'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    Taro.addInterceptor(Taro.interceptors.logInterceptor)
    Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)
    Taro.addInterceptor(inteprecitor)

    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App
