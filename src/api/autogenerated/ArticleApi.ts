import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

const add: Api<'/article/add', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/article/add`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await add.getRes({
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
  add: add.getData,
  getList_3: getList_3.getData
}

export default ArticleApi
