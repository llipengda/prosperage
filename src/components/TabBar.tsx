import React from 'react'
import { Image, Text, View } from '@tarojs/components'
import { TAB_BAR_LIST } from '@/common/tabBarList'
import useTabBarStore from '@/stores/tabBarStore'

const TabBar = React.memo(() => {
  const { active, setActive } = useTabBarStore()

  return (
    <View className='fixed bottom-[env(safe-area-inset-bottom)] w-screen bg-white flex flex-row items-center justify-around z-10'>
      {TAB_BAR_LIST.map((item, index) => (
        <View
          key={index}
          className='flex flex-col items-center justify-center mb-[10px]'
          onClick={() => setActive(index)}
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
