import Taro from '@tarojs/taro'
import { BASE_URL } from '@/common/constants'

const interceptor: Taro.interceptor = async chain => {
  chain.requestParams.url = BASE_URL + chain.requestParams.url
  return await chain.proceed(chain.requestParams)
}

export default interceptor
