import Taro from '@tarojs/taro'
import { ImageApi as _ImageApi, UserApi as _UserApi } from '@/api/autogenerated'
import { BASE_URL } from '@/common/constants'

const login = async () => {
  const code = (await Taro.login()).code
  return _UserApi.login({ code })
}
const send = ({ phone }: { phone: string }) => {
  if (phone.startsWith('+86')) {
    phone = phone.slice(3)
  } else {
    Taro.showModal({
      title: '提示',
      content: '暂不支持中国大陆以外的号码，建议您使用微信登录',
      showCancel: false
    })
    return null
  }
  return _UserApi.send({ phone })
}
const verify = ({ phone, code }: { phone: string; code: string }) => {
  if (phone.startsWith('+86')) {
    phone = phone.slice(3)
  } else {
    Taro.showModal({
      title: '提示',
      content: '暂不支持中国大陆以外的号码，建议您使用微信登录',
      showCancel: false
    })
    return null
  }
  return _UserApi.verify({ phone, code })
}
const UserApi = { ..._UserApi, login, send, verify }

const uploadImage = async ({ path }: { path: string }) => {
  const res = await Taro.uploadFile({
    url: `${BASE_URL}/image`,
    filePath: path,
    name: 'file'
  })
  return JSON.parse(res.data).data as string
}
const ImageApi = { ..._ImageApi, uploadImage }

export * from '@/api/autogenerated'
export { UserApi, ImageApi }
