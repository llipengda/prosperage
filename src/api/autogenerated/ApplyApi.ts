import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

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

const handle: Api<'/apply/handle', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/apply/handle?applyId=${params.query.applyId}&decision=${params.query.decision}`,
      method: 'POST'
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
  apply: apply.getData,
  getApplyList: getApplyList.getData,
  handle: handle.getData
}

export default ApplyApi
