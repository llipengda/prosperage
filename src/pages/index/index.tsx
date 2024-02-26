import { useLoad } from '@tarojs/taro'
import LogoPage from '@/components/index/LogoPage'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return <LogoPage />
}
