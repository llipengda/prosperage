import Taro from '@tarojs/taro'
import type { Page } from '@/app.config'

export type ToPage = {
  [key in Page]: `/${key}` | `/${key}?${string}`
}[Page]

export const navigate = (url: ToPage) => Taro.navigateTo({ url })

export const redirect = (url: ToPage) => Taro.redirectTo({ url })
