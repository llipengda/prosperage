import Taro from '@tarojs/taro'

export default function notImplemented() {
  Taro.showModal({
    title: '提示',
    content: '此功能尚不可用',
    showCancel: false
  })
}
