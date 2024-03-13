import Taro from '@tarojs/taro'
import { Api } from './types/api'

const getArticles: Api<'/search/articles', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/search/articles`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getArticles.getRes({
      query: {
        page: params.page,
        pageSize: params.pageSize,
        keyword: params.keyword
      }
    })
    return res.data.data
  }
}

const getFriendsPosts: Api<'/search/friendsPosts', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/search/friendsPosts`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getFriendsPosts.getRes({
      query: {
        page: params.page,
        pageSize: params.pageSize,
        keyword: params.keyword
      }
    })
    return res.data.data
  }
}

const getPosts: Api<'/search/posts', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/search/posts`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getPosts.getRes({
      query: {
        page: params.page,
        pageSize: params.pageSize,
        keyword: params.keyword
      }
    })
    return res.data.data
  }
}

const getUserList: Api<'/search/users', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/search/users`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getUserList.getRes({
      query: {
        page: params.page,
        pageSize: params.pageSize,
        keyword: params.keyword
      }
    })
    return res.data.data
  }
}

const SearchApi = {
  getArticles: getArticles.getData,
  /** 根据关键词搜索好友的帖子 */
  getFriendsPosts: getFriendsPosts.getData,
  /** 根据关键词搜索帖子 */
  getPosts: getPosts.getData,
  /** 根据关键词搜索用户 */
  getUserList: getUserList.getData
}

export default SearchApi
