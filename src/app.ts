import { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import interceptor from '@/utils/interceptor'
import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    Taro.addInterceptor(Taro.interceptors.logInterceptor)
    Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)
    Taro.addInterceptor(interceptor)

    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App
