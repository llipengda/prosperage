import { useState } from 'react'
import Taro, { useLoad, useUnload } from '@tarojs/taro'
import { type Page } from '@/app.config'

export const navigate = (url: string) => Taro.navigateTo({ url })

type ToPage = {
  [key in Page]: `/${key}`
}[Page]

type NavigateProps = {
  to: ToPage
  delay?: number
}

export default function Navigate({ to, delay = 0 }: NavigateProps) {
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  useLoad(() => {
    setTimer(
      setTimeout(() => {
        navigate(to)
      }, delay)
    )
  })

  useUnload(() => clearTimeout(timer))

  return <></>
}
