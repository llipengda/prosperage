import React from 'react'
import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { TAB_BAR_LIST } from '@/common/tabBarList'
import useTabBarStore from '@/stores/tabBarStore'

const TabBar = React.memo(() => {
  const { active, setActive } = useTabBarStore()

  const handleClick = (index: number) => () => {
    Taro.pageScrollTo({ scrollTop: 0 })
    setActive(index)
  }

  return (
    <View className='fixed bottom-0 pb-[env(safe-area-inset-bottom)] w-screen bg-white flex flex-row items-center justify-around z-10 h-[calc(142px+env(safe-area-inset-bottom))]'>
      {TAB_BAR_LIST.map((item, index) => (
        <View
          key={index}
          className='flex flex-col items-center justify-center mb-[10px]'
          onClick={handleClick(index)}
        >
          <View
            className={`w-[64px] h-[64px] mb-2 ${index === 0 ? 'ml-[12%]' : ''}`}
          >
            <Image
              src={index === active ? item.selectedIconPath : item.iconPath}
              mode='aspectFit'
              className='w-full h-full'
            />
          </View>
          <Text className='text-[20px]'>{item.text}</Text>
        </View>
      ))}
    </View>
  )
})

export default TabBar
