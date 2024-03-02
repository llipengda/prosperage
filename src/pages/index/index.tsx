import { useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { UserApi } from '@/api'
import TabBar from '@/components/TabBar'
import Community from '@/pages/index/tabbars/community'
import Home from '@/pages/index/tabbars/home'
import Me from '@/pages/index/tabbars/me'
import Policy from '@/pages/index/tabbars/policy'
import useTabBarStore from '@/stores/tabBarStore'
import useUserStore from '@/stores/userStore'

const Route = ({ current }: { current: number }) => {
  switch (current) {
    case 0:
      return <Home />
    case 1:
      return <Policy />
    case 2:
      return <Community />
    case 3:
      return <Me />
    default:
      return <Home />
  }
}

export default function Index() {
  const tab = Taro.useRouter().params?.tab

  const { active, setActive } = useTabBarStore()

  const setUser = useUserStore(state => state.setInfo)

  useEffect(() => {
    if (tab) {
      setActive(Number(tab))
    }
    UserApi.info().then(res => setUser(res))
  }, [setActive, setUser, tab])

  return (
    <View>
      <Route current={active} />
      <View className='h-[calc(142px+env(safe-area-inset-bottom)+10px)]' />
      <TabBar />
    </View>
  )
}
