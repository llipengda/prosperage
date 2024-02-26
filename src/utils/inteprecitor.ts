import Taro from '@tarojs/taro'
import { OPENAPI_URL } from '@/common/constants'

export const inteprecitor: Taro.interceptor = async chain => {
  chain.requestParams.url = OPENAPI_URL + chain.requestParams.url
  return await chain.proceed(chain.requestParams)
}
