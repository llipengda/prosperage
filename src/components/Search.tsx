import React, { useState } from 'react'
import { Image, Input, View } from '@tarojs/components'
import scan from '@/assets/scan.svg'
import search from '@/assets/search.svg'
import notImplemented from '@/utils/notImplemented'

type SearchProps = {
  className?: string
}

function Search({ className }: SearchProps) {
  const [value, setValue] = useState('')

  const handleSearch = () => {
    console.log('search', value)
    notImplemented()
  }

  const handleScan = notImplemented

  return (
    <View className={className}>
      <View className='h-[84px] bg-[#FFFFFF80] rounded-[200px] flex flex-row items-center justify-center shadow-[0_8px_24px_0_rgba(0,0,0,0.25)]'>
        <Image
          src={search}
          className='w-[50px] h-[50px] mx-[20px]'
          onClick={handleSearch}
        />
        <Input
          className='w-full text-white'
          placeholder='搜索养老金政策/咨询'
          placeholderClass='text-white'
          onInput={e => setValue(e.detail.value)}
        />
        <Image
          src={scan}
          className='w-[54px] h-[54px] mx-[20px]'
          onClick={handleScan}
        />
      </View>
    </View>
  )
}

export default React.memo(Search)
