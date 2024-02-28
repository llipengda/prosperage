import { useEffect } from 'react'
import Taro from '@tarojs/taro'
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
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(to)
    }, delay)

    return () => clearTimeout(timer)
  }, [to, delay])

  return <></>
}
