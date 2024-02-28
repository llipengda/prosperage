import Taro from '@tarojs/taro'
import type { StateStorage } from 'zustand/middleware'

const TaroStorage: StateStorage = {
  getItem: (name: string) =>
    Taro.getStorageSync(name),
  setItem: (name: string, value: string) =>
    Taro.setStorageSync(name, value),
  removeItem: (name: string) => Taro.removeStorageSync(name)
}

export default TaroStorage
