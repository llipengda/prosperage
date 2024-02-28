import community from '@/assets/tab_bar/community.svg'
import communitySelected from '@/assets/tab_bar/community_selected.svg'
import home from '@/assets/tab_bar/home.svg'
import homeSelected from '@/assets/tab_bar/home_selected.svg'
import me from '@/assets/tab_bar/me.svg'
import meSelected from '@/assets/tab_bar/me_selected.svg'
import policy from '@/assets/tab_bar/policy.svg'
import policySelected from '@/assets/tab_bar/policy_selected.svg'

type TabBarList = {
  text: string
  iconPath: string
  selectedIconPath: string
}[]

export const TAB_BAR_LIST: TabBarList = [
  {
    text: '首页定制',
    iconPath: home,
    selectedIconPath: homeSelected
  },
  {
    text: '政策解读',
    iconPath: policy,
    selectedIconPath: policySelected
  },
  {
    text: '社区互动',
    iconPath: community,
    selectedIconPath: communitySelected
  },
  {
    text: '个人主页',
    iconPath: me,
    selectedIconPath: meSelected
  }
]
