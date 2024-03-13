import Taro from '@tarojs/taro'
import { Api } from './types/api'

const check: Api<'/user/check', 'GET'> = {
  async getRes() {
    return Taro.request({
      url: `/user/check`,
      method: 'GET'
    })
  },
  async getData() {
    const res = await check.getRes()
    return res.data.data
  }
}

const deleteUser: Api<'/user/delete', 'DELETE'> = {
  async getRes() {
    return Taro.request({
      url: `/user/delete`,
      method: 'DELETE'
    })
  },
  async getData() {
    const res = await deleteUser.getRes()
    return res.data.data
  }
}

const info_1: Api<'/user/id', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/user/id`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await info_1.getRes({ query: { id: params.id } })
    return res.data.data
  }
}

const info: Api<'/user/info', 'GET'> = {
  async getRes() {
    return Taro.request({
      url: `/user/info`,
      method: 'GET'
    })
  },
  async getData() {
    const res = await info.getRes()
    return res.data.data
  }
}

const login: Api<'/user/login', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/user/login`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await login.getRes({ query: { code: params.code } })
    return res.data.data
  }
}

const send: Api<'/user/send', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/user/send?phone=${params.query.phone}`,
      method: 'POST'
    })
  },
  async getData(params) {
    const res = await send.getRes({ query: { phone: params.phone } })
    return res.data.data
  }
}

const update: Api<'/user/update', 'PUT'> = {
  async getRes(params) {
    return Taro.request({
      url: `/user/update`,
      method: 'PUT',
      data: params.body
    })
  },
  async getData(params) {
    const res = await update.getRes({
      body: {
        name: params.name,
        gender: params.gender,
        nation: params.nation,
        documentType: params.documentType,
        documentNumber: params.documentNumber,
        documentValidDate: params.documentValidDate,
        job: params.job,
        address: params.address,
        avatar: params.avatar
      }
    })
    return res.data.data
  }
}

const verify: Api<'/user/verify', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/user/verify`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await verify.getRes({ query: { code: params.code } })
    return res.data.data
  }
}

const UserApi = {
  /** 检查登录态 */
  check: check.getData,
  /** 删除用户 */
  deleteUser: deleteUser.getData,
  /** 获取指定id的用户信息 */
  info1: info_1.getData,
  /** 获取用户信息 */
  info: info.getData,
  /** 用户登录 */
  login: login.getData,
  /** 发送手机验证码 */
  send: send.getData,
  /** 用户更新信息 */
  update: update.getData,
  /** 验证手机验证码 */
  verify: verify.getData
}

export default UserApi
