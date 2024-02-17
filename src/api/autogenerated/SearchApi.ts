import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

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
  getFriendsPosts: getFriendsPosts.getData,
  getPosts: getPosts.getData,
  getUserList: getUserList.getData
}

export default SearchApi
