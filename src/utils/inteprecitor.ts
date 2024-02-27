import Taro from '@tarojs/taro'
import { BASE_URL } from '@/common/constants'

export const inteprecitor: Taro.interceptor = async chain => {
  chain.requestParams.url = BASE_URL + chain.requestParams.url
  return await chain.proceed(chain.requestParams)
}
