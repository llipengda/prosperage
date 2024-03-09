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
    Taro.getCurrentInstance()?.router?.path?.replace(/\//g, '_')
  if (document.getElementById(id)) {
    return id
  }
  view.id = id
  render(element, view)
  page?.appendChild(view)
  return view.id
}

export const unmountFromPage = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    unmountComponentAtNode(element)
    element.remove()
  }
}
