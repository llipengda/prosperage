import Taro from '@tarojs/taro'
import { Api } from './types/api'

const delete_1: Api<'/msg/delete', 'DELETE'> = {
  async getRes(params) {
    return Taro.request({
      url: `/msg/delete?id=${params.query.id}`,
      method: 'DELETE'
    })
  },
  async getData(params) {
    const res = await delete_1.getRes({ query: { id: params.id } })
    return res.data.data
  }
}

const get_4: Api<'/msg/get', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/msg/get`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await get_4.getRes({
      query: {
        friendId: params.friendId,
        page: params.page,
        pageSize: params.pageSize
      }
    })
    return res.data.data
  }
}

const MsgApi = {
  /** 删除消息 */
  delete: delete_1.getData,
  /** 获取指定好友消息列表 */
  get: get_4.getData
}

export default MsgApi
