import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

const addSuggestion: Api<'/suggestion/add', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/suggestion/add`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await addSuggestion.getRes({
      body: {
        title: params.title,
        content: params.content,
        image: params.image
      }
    })
    return res.data.data
  }
}

const getSuggestions: Api<'/suggestion/get', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/suggestion/get`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getSuggestions.getRes({
      query: { page: params.page, pageSize: params.pageSize }
    })
    return res.data.data
  }
}

const SuggestionApi = {
  /** 添加意见反馈 */
  addSuggestion: addSuggestion.getData,
  /** 获取意见反馈列表 */
  getSuggestions: getSuggestions.getData
}

export default SuggestionApi
