import { useLoad } from '@tarojs/taro'
import Login from '@/components/index/Login'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return <Login />
}
