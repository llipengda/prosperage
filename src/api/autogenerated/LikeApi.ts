import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

const like: Api<'/like/do', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/like/do`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await like.getRes({
      body: { objId: params.objId, type: params.type }
    })
    return res.data.data
  }
}

const unlike: Api<'/like/undo', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/like/undo`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await unlike.getRes({
      body: { objId: params.objId, type: params.type }
    })
    return res.data.data
  }
}

const LikeApi = {
  /** 点赞 */
  like: like.getData,
  /** 取消点赞 */
  unlike: unlike.getData
}

export default LikeApi
