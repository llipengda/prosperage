import Taro from '@tarojs/taro'
import { Api } from './types/api'

const doResponse: Api<'/response/do', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/response/do`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await doResponse.getRes({
      body: {
        issueId: params.issueId,
        optionId: params.optionId,
        answer: params.answer
      }
    })
    return res.data.data
  }
}

const finishResponse: Api<'/response/finish', 'PUT'> = {
  async getRes() {
    return Taro.request({
      url: `/response/finish`,
      method: 'PUT'
    })
  },
  async getData() {
    const res = await finishResponse.getRes()
    return res.data.data
  }
}

const getResponse: Api<'/response/get', 'GET'> = {
  async getRes() {
    return Taro.request({
      url: `/response/get`,
      method: 'GET'
    })
  },
  async getData() {
    const res = await getResponse.getRes()
    return res.data.data
  }
}

const getSurveyData: Api<'/response/getAll', 'GET'> = {
  async getRes() {
    return Taro.request({
      url: `/response/getAll`,
      method: 'GET'
    })
  },
  async getData() {
    const res = await getSurveyData.getRes()
    return res.data.data
  }
}

const get_2: Api<'/response/getIssues', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/response/getIssues`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await get_2.getRes({
      query: {
        sectionId: params.sectionId,
        page: params.page,
        pageSize: params.pageSize
      }
    })
    return res.data.data
  }
}

const getLatest: Api<'/response/getLatest', 'GET'> = {
  async getRes() {
    return Taro.request({
      url: `/response/getLatest`,
      method: 'GET'
    })
  },
  async getData() {
    const res = await getLatest.getRes()
    return res.data.data
  }
}

const get_1: Api<'/response/getSections', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/response/getSections`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await get_1.getRes({ query: { surveyId: params.surveyId } })
    return res.data.data
  }
}

const getResult: Api<'/response/res', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/response/res`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getResult.getRes({
      query: { responseId: params.responseId }
    })
    return res.data.data
  }
}

const startResponse: Api<'/response/start', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/response/start?surveyId=${params.query.surveyId}`,
      method: 'POST'
    })
  },
  async getData(params) {
    const res = await startResponse.getRes({
      query: { surveyId: params.surveyId }
    })
    return res.data.data
  }
}

const ResponseApi = {
  /** 作答/修改问卷题目 */
  doResponse: doResponse.getData,
  /** 完成问卷 */
  finishResponse: finishResponse.getData,
  /** 获取当前用户正在作答的问卷记录 */
  getResponse: getResponse.getData,
  /** 获取用户的所有已完成的问卷作答记录 */
  getSurveyData: getSurveyData.getData,
  /** 获取章节包含的问题+选项列表 */
  get: get_2.getData,
  /** 获取用户最近已完成的问卷作答记录 */
  getLatest: getLatest.getData,
  /** 获取问卷包含的所有章节 */
  get1: get_1.getData,
  /** 获取问卷作答结果 */
  getResult: getResult.getData,
  /** 开始作答问卷 */
  startResponse: startResponse.getData
}

export default ResponseApi
