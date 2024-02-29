import Taro from '@tarojs/taro'

export const navigate = (url: string) => Taro.navigateTo({ url })

export const redirect = (url: string) => Taro.redirectTo({ url })
