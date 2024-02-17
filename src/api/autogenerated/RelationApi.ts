import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

const deleteFriend: Api<'/relation/del', 'DELETE'> = {
  async getRes(params) {
    return Taro.request({
      url: `/relation/del?friendId=${params.query.friendId}`,
      method: 'DELETE'
    })
  },
  async getData(params) {
    const res = await deleteFriend.getRes({
      query: { friendId: params.friendId }
    })
    return res.data.data
  }
}

const getFriendList: Api<'/relation/getFriendList', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/relation/getFriendList`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getFriendList.getRes({
      query: { page: params.page, pageSize: params.pageSize }
    })
    return res.data.data
  }
}

const RelationApi = {
  /** 删除好友 */
  deleteFriend: deleteFriend.getData,
  /** 获取好友列表 */
  getFriendList: getFriendList.getData
}

export default RelationApi
