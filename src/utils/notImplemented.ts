import Taro from '@tarojs/taro'

const notImplemented = () =>
  Taro.showModal({
    title: '提示',
    content: '暂不支持此功能',
    showCancel: false
  })

export default notImplemented
