import { useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import TabBar from '@/components/TabBar'
import Community from '@/pages/index/tabbars/community'
import Home from '@/pages/index/tabbars/home'
import Me from '@/pages/index/tabbars/me'
import Policy from '@/pages/index/tabbars/policy'
import useTabBarStore from '@/stores/tabBarStore'

const tabMap = {
  home: 0,
  policy: 1,
  community: 2,
  me: 3
}

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

  useEffect(() => {
    if (tab) {
      setActive(tabMap[tab as keyof typeof tabMap])
    }
  }, [setActive, tab])

  return (
    <View>
      <Route current={active} />
      <TabBar />
    </View>
  )
}
