import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

const getSuggestions_1: Api<'/help/get', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/help/get`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getSuggestions_1.getRes({
      query: { page: params.page, pageSize: params.pageSize }
    })
    return res.data.data
  }
}

const getDetail_1: Api<'/help/getDetail', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/help/getDetail`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getDetail_1.getRes({ query: { id: params.id } })
    return res.data.data
  }
}

const HelpApi = {
  /** 获取简要常见问题 */
  getSuggestions: getSuggestions_1.getData,
  /** 获取常见问题详情 */
  getDetail: getDetail_1.getData
}

export default HelpApi
