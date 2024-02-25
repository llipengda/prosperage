import Taro from '@tarojs/taro'
import { Api } from './types/api'

const apply: Api<'/apply/do', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/apply/do?toUserId=${params.query.toUserId}`,
      method: 'POST'
    })
  },
  async getData(params) {
    const res = await apply.getRes({ query: { toUserId: params.toUserId } })
    return res.data.data
  }
}

const getApplyList: Api<'/apply/getApplyList', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/apply/getApplyList`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getApplyList.getRes({
      query: { page: params.page, pageSize: params.pageSize }
    })
    return res.data.data
  }
}

const handle: Api<'/apply/handle', 'PUT'> = {
  async getRes(params) {
    return Taro.request({
      url: `/apply/handle?applyId=${params.query.applyId}&decision=${params.query.decision}`,
      method: 'PUT'
    })
  },
  async getData(params) {
    const res = await handle.getRes({
      query: { applyId: params.applyId, decision: params.decision }
    })
    return res.data.data
  }
}

const ApplyApi = {
  /** 此用户申请添加指定用户为好友 */
  apply: apply.getData,
  /** 获取好友申请列表 */
  getApplyList: getApplyList.getData,
  /** 处理好友申请 */
  handle: handle.getData
}

export default ApplyApi
