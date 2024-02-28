import Taro from '@tarojs/taro'

const errorModal = (msg: string) =>
  Taro.showModal({
    title: '错误',
    content: msg,
    showCancel: false
  })

export default errorModal
