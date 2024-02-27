import Taro from '@tarojs/taro'
import type { StateStorage } from 'zustand/middleware'

const TaroStorage: StateStorage = {
  getItem: (name: string) =>
    Taro.getStorage({ key: name }).then(res => res.data),
  setItem: (name: string, value: string) =>
    Taro.setStorage({ key: name, data: value }),
  removeItem: (name: string) => Taro.removeStorage({ key: name })
}

export default TaroStorage
