import Taro from '@tarojs/taro'
import { Api } from './types/api'

const add: Api<'/survey/add', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/add`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await add.getRes({
      body: { title: params.title, description: params.description }
    })
    return res.data.data
  }
}

const del: Api<'/survey/del', 'DELETE'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/del?id=${params.query.id}`,
      method: 'DELETE'
    })
  },
  async getData(params) {
    const res = await del.getRes({ query: { id: params.id } })
    return res.data.data
  }
}

const get: Api<'/survey/get', 'GET'> = {
  async getRes() {
    return Taro.request({
      url: `/survey/get`,
      method: 'GET'
    })
  },
  async getData() {
    const res = await get.getRes()
    return res.data.data
  }
}

const addIssue: Api<'/survey/issue/add', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/issue/add`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await addIssue.getRes({
      body: {
        sectionId: params.sectionId,
        content: params.content,
        type: params.type,
        weight: params.weight
      }
    })
    return res.data.data
  }
}

const delIssue: Api<'/survey/issue/del', 'DELETE'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/issue/del?id=${params.query.id}`,
      method: 'DELETE'
    })
  },
  async getData(params) {
    const res = await delIssue.getRes({ query: { id: params.id } })
    return res.data.data
  }
}

const getIssue: Api<'/survey/issue/get', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/issue/get`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getIssue.getRes({
      query: { sectionId: params.sectionId }
    })
    return res.data.data
  }
}

const updateIssue: Api<'/survey/issue/update', 'PUT'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/issue/update`,
      method: 'PUT',
      data: params.body
    })
  },
  async getData(params) {
    const res = await updateIssue.getRes({
      body: { id: params.id, content: params.content, weight: params.weight }
    })
    return res.data.data
  }
}

const addOption: Api<'/survey/option/add', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/option/add`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await addOption.getRes({
      body: {
        issueId: params.issueId,
        content: params.content,
        score: params.score
      }
    })
    return res.data.data
  }
}

const delOption: Api<'/survey/option/del', 'DELETE'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/option/del?id=${params.query.id}`,
      method: 'DELETE'
    })
  },
  async getData(params) {
    const res = await delOption.getRes({ query: { id: params.id } })
    return res.data.data
  }
}

const getOption: Api<'/survey/option/get', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/option/get`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getOption.getRes({ query: { issueId: params.issueId } })
    return res.data.data
  }
}

const updateOption: Api<'/survey/option/update', 'PUT'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/option/update`,
      method: 'PUT',
      data: params.body
    })
  },
  async getData(params) {
    const res = await updateOption.getRes({
      body: { id: params.id, content: params.content, score: params.score }
    })
    return res.data.data
  }
}

const addSection: Api<'/survey/section/add', 'POST'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/section/add`,
      method: 'POST',
      data: params.body
    })
  },
  async getData(params) {
    const res = await addSection.getRes({
      body: {
        surveyId: params.surveyId,
        title: params.title,
        description: params.description
      }
    })
    return res.data.data
  }
}

const delSection: Api<'/survey/section/del', 'DELETE'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/section/del?id=${params.query.id}`,
      method: 'DELETE'
    })
  },
  async getData(params) {
    const res = await delSection.getRes({ query: { id: params.id } })
    return res.data.data
  }
}

const getSection: Api<'/survey/section/get', 'GET'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/section/get`,
      method: 'GET',
      data: params.query
    })
  },
  async getData(params) {
    const res = await getSection.getRes({
      query: { surveyId: params.surveyId }
    })
    return res.data.data
  }
}

const updateSection: Api<'/survey/section/update', 'PUT'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/section/update`,
      method: 'PUT',
      data: params.body
    })
  },
  async getData(params) {
    const res = await updateSection.getRes({
      body: {
        id: params.id,
        title: params.title,
        description: params.description
      }
    })
    return res.data.data
  }
}

const update_1: Api<'/survey/update', 'PUT'> = {
  async getRes(params) {
    return Taro.request({
      url: `/survey/update`,
      method: 'PUT',
      data: params.body
    })
  },
  async getData(params) {
    const res = await update_1.getRes({
      body: {
        id: params.id,
        title: params.title,
        description: params.description
      }
    })
    return res.data.data
  }
}

const SurveyApi = {
  /** 添加问卷 */
  add: add.getData,
  /** 删除问卷 */
  del: del.getData,
  /** 获取问卷 */
  get: get.getData,
  /** 添加问题 */
  addIssue: addIssue.getData,
  /** 删除问题 */
  delIssue: delIssue.getData,
  /** 获取问题 */
  getIssue: getIssue.getData,
  /** 更新问题 */
  updateIssue: updateIssue.getData,
  /** 添加选项 */
  addOption: addOption.getData,
  /** 删除选项 */
  delOption: delOption.getData,
  /** 获取选项 */
  getOption: getOption.getData,
  /** 更新选项 */
  updateOption: updateOption.getData,
  /** 添加章节 */
  addSection: addSection.getData,
  /** 删除章节 */
  delSection: delSection.getData,
  /** 获取章节 */
  getSection: getSection.getData,
  /** 更新章节 */
  updateSection: updateSection.getData,
  /** 更新问卷 */
  update: update_1.getData
}

export default SurveyApi
