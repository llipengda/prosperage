import React, { useState } from 'react'
import { Button, Image, View } from '@tarojs/components'
import logoEn from '@/assets/logo_en.svg'
import logoCn from '@/assets/logo_zh.svg'

export default function LogoPage() {
  const [gradient, setGradient] = useState(false)

  const handleClick = () => setGradient(!gradient)

  return (
    <View
      className={`${gradient ? 'bg-gradient-to-b from-primary to-50%' : 'bg-primary'} w-screen h-screen flex flex-col items-center justify-center transition-all duration-500 ease-in-out`}
    >
      <Image src={logoEn} className='w-4/5' mode='widthFix' />
      <Image src={logoCn} className='w-[30%] ml-[-50%] mt-2' mode='widthFix' />
      <Button onClick={handleClick}>click</Button>
    </View>
  )
}
