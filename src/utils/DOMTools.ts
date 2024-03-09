import type { ReactElement } from 'react'
import { render, unmountComponentAtNode } from '@tarojs/react'
import Taro from '@tarojs/taro'

export const mountToPage = (element: ReactElement) => {
  const currentPages = Taro.getCurrentPages()
  const currentPage = currentPages[currentPages.length - 1]
  const page = document.getElementById(currentPage.$taroPath)
  const view = document.createElement('view')
  const id =
    '__DOMTools__mounted__' +
    Taro.getCurrentInstance()?.router?.path?.replace(/\//g, '_') +
    '__' +
    Date.now()
  if (document.getElementById(id)) {
    return id
  }
  view.id = id
  render(element, view)
  page?.appendChild(view)
  return id
}

export const unmountAtId = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    unmountComponentAtNode(element)
    element.remove()
  }
}

export const mountTo = (id: string, element: ReactElement) => {
  const container = document.getElementById(id)
  if (!container) {
    return
  }
  render(element, container)
}
