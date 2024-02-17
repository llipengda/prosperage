import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

const comment: Api<'/comment/add', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/comment/add`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await comment.getRes({
      body: { content: params.content, objId: params.objId, type: params.type }
    })
    return res.data.data
  }
}

const delete_1: Api<'/comment/del', 'DELETE'> = {
  async getRes(params) {
    return Taro.request({
      url: `/comment/del?commentId=${params.query.commentId}`,
      method: 'DELETE'
    })
  },
  async getData(params) {
    const res = await delete_1.getRes({
      query: { commentId: params.commentId }
    })
    return res.data.data
  }
}

const getList_2: Api<'/comment/get', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/comment/get`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getList_2.getRes({
      query: {
        page: params.page,
        pageSize: params.pageSize,
        objId: params.objId,
        type: params.type
      }
    })
    return res.data.data
  }
}

const getDetail_2: Api<'/comment/getDetail', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/comment/getDetail`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getDetail_2.getRes({
      query: { commentId: params.commentId, type: params.type }
    })
    return res.data.data
  }
}

const share_1: Api<'/comment/share', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/comment/share?commentId=${params.query.commentId}`,
      method: 'POST'
    })
  },
  async getData(params) {
    const res = await share_1.getRes({ query: { commentId: params.commentId } })
    return res.data.data
  }
}

const CommentApi = {
  comment: comment.getData,
  delete: delete_1.getData,
  getList: getList_2.getData,
  getDetail: getDetail_2.getData,
  share: share_1.getData
}

export default CommentApi
