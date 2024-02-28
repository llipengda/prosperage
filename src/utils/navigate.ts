import Taro from '@tarojs/taro'

export const navigate = (url: string) => Taro.navigateTo({ url })
