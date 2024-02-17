import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

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
        phone: params.phone,
        job: params.job,
        address: params.address,
        avatar: params.avatar
      }
    })
    return res.data.data
  }
}

const UserApi = {
  check: check.getData,
  deleteUser: deleteUser.getData,
  info1: info_1.getData,
  info: info.getData,
  login: login.getData,
  update: update.getData
}

export default UserApi
