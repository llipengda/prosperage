import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

const addPost: Api<'/post/add', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/post/add`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await addPost.getRes({
      body: { content: params.content, image: params.image }
    })
    return res.data.data
  }
}

const $delete: Api<'/post/del', 'DELETE'> = {
  async getRes(params) {
    return Taro.request({
      url: `/post/del?postId=${params.query.postId}`,
      method: 'DELETE'
    })
  },
  async getData(params) {
    const res = await $delete.getRes({ query: { postId: params.postId } })
    return res.data.data
  }
}

const getList_1: Api<'/post/get', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/post/get`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getList_1.getRes({
      query: {
        page: params.page,
        pageSize: params.pageSize,
        orderByPopularity: params.orderByPopularity
      }
    })
    return res.data.data
  }
}

const getByUser: Api<'/post/getByUser', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/post/getByUser`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getByUser.getRes({
      query: {
        userId: params.userId,
        page: params.page,
        pageSize: params.pageSize
      }
    })
    return res.data.data
  }
}

const getDetail: Api<'/post/getDetail', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/post/getDetail`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getDetail.getRes({ query: { postId: params.postId } })
    return res.data.data
  }
}

const getFriendsPost: Api<'/post/getFriendsPost', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/post/getFriendsPost`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getFriendsPost.getRes({
      query: { page: params.page, pageSize: params.pageSize }
    })
    return res.data.data
  }
}

const share: Api<'/post/share', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/post/share?postId=${params.query.postId}`,
      method: 'POST'
    })
  },
  async getData(params) {
    const res = await share.getRes({ query: { postId: params.postId } })
    return res.data.data
  }
}

const PostApi = {
  /** 添加帖子 */
  addPost: addPost.getData,
  delete: $delete.getData,
  /** 获取帖子列表 */
  getList: getList_1.getData,
  /** 获取指定用户的帖子列表
 用于查看个人主页 */
  getByUser: getByUser.getData,
  /** 获取帖子详情 */
  getDetail: getDetail.getData,
  /** 获取好友的帖子列表 */
  getFriendsPost: getFriendsPost.getData,
  /** 分享帖子 */
  share: share.getData
}

export default PostApi
