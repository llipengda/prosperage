import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

const addReply: Api<'/reply/add', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/reply/add`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await addReply.getRes({
      body: {
        content: params.content,
        commentId: params.commentId,
        toId: params.toId
      }
    })
    return res.data.data
  }
}

const delReply: Api<'/reply/del', 'DELETE'> = {
  async getRes(params) {
    return Taro.request({
      url: `/reply/del?replyId=${params.query.replyId}`,
      method: 'DELETE'
    })
  },
  async getData(params) {
    const res = await delReply.getRes({ query: { replyId: params.replyId } })
    return res.data.data
  }
}

const getList: Api<'/reply/get', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/reply/get`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getList.getRes({
      query: {
        page: params.page,
        pageSize: params.pageSize,
        commentId: params.commentId
      }
    })
    return res.data.data
  }
}

const ReplyApi = {
  /** 添加回复 */
  addReply: addReply.getData,
  /** 删除回复 */
  delReply: delReply.getData,
  /** 获取回复列表 */
  getList: getList.getData
}

export default ReplyApi
