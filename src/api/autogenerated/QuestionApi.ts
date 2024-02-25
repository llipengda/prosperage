import Taro from '@tarojs/taro'
import { Api } from './types/api'

const add_1: Api<'/question/add', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/question/add`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await add_1.getRes({
      body: { content: params.content, answer: params.answer }
    })
    return res.data.data
  }
}

const get_3: Api<'/question/get', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/question/get`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await get_3.getRes({ query: { sentence: params.sentence } })
    return res.data.data
  }
}

const getDetail: Api<'/question/getDetail', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/question/getDetail`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getDetail.getRes({ query: { id: params.id } })
    return res.data.data
  }
}

const getRand: Api<'/question/getRand', 'GET'> = {
  async getRes() {
    return Taro.request({
      url: `/question/getRand`,
      method: 'GET'
    })
  },
  async getData() {
    const res = await getRand.getRes()
    return res.data.data
  }
}

const QuestionApi = {
  /** 添加问题 */
  add: add_1.getData,
  /** 问答搜索
 输入用户提问的句子，返回包含关键词的问题列表，如果没有找到关键词则返回空列表 */
  get: get_3.getData,
  /** 获取问答全部内容 */
  getDetail: getDetail.getData,
  /** 获取随机问题
 猜你想问？ */
  getRand: getRand.getData
}

export default QuestionApi
