import Taro from '@tarojs/taro'
import { Api } from './types/api'

const uploadImages: Api<'/images', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/images`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await uploadImages.getRes({
      body: { file: params.file }
    })
    return res.data.data
  }
}

const ImagesApi = {
  /** 上传多张图片 */
  uploadImages: uploadImages.getData
}

export default ImagesApi
