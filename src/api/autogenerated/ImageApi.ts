import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

const uploadImage: Api<'/image', 'POST'> = {
  async getRes() {
    return Taro.request({
      url: `/image`,
      method: 'POST'
    })
  },
  async getData() {
    const res = await uploadImage.getRes()
    return res.data.data
  }
}

const ImageApi = {
  uploadImage: uploadImage.getData
}

export default ImageApi
