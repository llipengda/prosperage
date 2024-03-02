import Taro from '@tarojs/taro'
import { type Result, UserApi } from '@/api'
import { BASE_URL } from '@/common/constants'
import useLoginStore from '@/stores/loginStore'

const interceptor: Taro.interceptor = async chain => {
  const requestParams: typeof chain.requestParams = JSON.parse(
    JSON.stringify(chain.requestParams)
  )
  chain.requestParams.url = BASE_URL + chain.requestParams.url
  chain.requestParams.header = {
    ...chain.requestParams.header,
    Authorization: `Bearer ${useLoginStore.getState().token}`
  }

  return chain
    .proceed(chain.requestParams)
    .then(async (res: Taro.request.SuccessCallbackResult<Result<any>>) => {
      if (
        res.statusCode === 401 ||
        /** token 过期 */
        (res.statusCode === 200 && res.data.code === 4010)
      ) {
        console.log('token 错误或已过期')
        const { token } = await UserApi.login()
        if (!token) {
          useLoginStore.getState().removeToken()
          Taro.reLaunch({ url: '/pages/login/login' })
          return res
        }
        useLoginStore.getState().setToken(token)
        return Taro.request(requestParams)
      }
      return res
    })
}

export default interceptor
