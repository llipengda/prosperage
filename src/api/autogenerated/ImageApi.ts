import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

const uploadImage: Api<'/image', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/image`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await uploadImage.getRes({
      body: { file: params.file }
    })
    return res.data.data
  }
}

const ImageApi = {
  /** 上传图片 */
  uploadImage: uploadImage.getData
}

export default ImageApi
