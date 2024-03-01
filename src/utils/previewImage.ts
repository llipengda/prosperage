import type { ITouchEvent } from '@tarojs/components'
import Taro from '@tarojs/taro'

const previewImage = (url: string) => (e: ITouchEvent) => {
  e.stopPropagation()
  e.preventDefault()
  Taro.previewImage({
    current: url,
    urls: [url]
  })
}

export default previewImage
