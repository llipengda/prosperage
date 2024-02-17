import Taro from '@tarojs/taro'
import { Api } from '@/types/api'

const test200: Api<'/test/200', 'GET'> = {
  async getRes() {
    Taro.request({
      url: `/test/200`,
      method: 'GET'
    })
  },
  async getData() {
    await test200.getRes()
  }
}

const test400: Api<'/test/400', 'GET'> = {
  async getRes() {
    Taro.request({
      url: `/test/400`,
      method: 'GET'
    })
  },
  async getData() {
    await test400.getRes()
  }
}

const test401: Api<'/test/401', 'GET'> = {
  async getRes() {
    Taro.request({
      url: `/test/401`,
      method: 'GET'
    })
  },
  async getData() {
    await test401.getRes()
  }
}

const test403: Api<'/test/403', 'GET'> = {
  async getRes() {
    Taro.request({
      url: `/test/403`,
      method: 'GET'
    })
  },
  async getData() {
    await test403.getRes()
  }
}

const test404: Api<'/test/404', 'GET'> = {
  async getRes() {
    Taro.request({
      url: `/test/404`,
      method: 'GET'
    })
  },
  async getData() {
    await test404.getRes()
  }
}

const test500: Api<'/test/500', 'GET'> = {
  async getRes() {
    Taro.request({
      url: `/test/500`,
      method: 'GET'
    })
  },
  async getData() {
    await test500.getRes()
  }
}

const test502: Api<'/test/502', 'GET'> = {
  async getRes() {
    Taro.request({
      url: `/test/502`,
      method: 'GET'
    })
  },
  async getData() {
    await test502.getRes()
  }
}

const TestApi = {
  test200: test200.getData,
  test400: test400.getData,
  test401: test401.getData,
  test403: test403.getData,
  test404: test404.getData,
  test500: test500.getData,
  test502: test502.getData
}

export default TestApi
