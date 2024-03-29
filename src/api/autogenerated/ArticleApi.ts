import Taro from '@tarojs/taro'
import { Api } from './types/api'

const add_2: Api<'/article/add', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/article/add`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await add_2.getRes({
      body: {
        type: params.type,
        title: params.title,
        content: params.content,
        image: params.image,
        link: params.link
      }
    })
    return res.data.data
  }
}

const getList_3: Api<'/article/get', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/article/get`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getList_3.getRes({
      query: { page: params.page, pageSize: params.pageSize, type: params.type }
    })
    return res.data.data
  }
}

const ArticleApi = {
  /** 添加文章 */
  add: add_2.getData,
  /** 获取文章列表 */
  getList: getList_3.getData
}

export default ArticleApi
