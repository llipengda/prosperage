import { useState } from 'react'
import { Image, Text, Textarea, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ImageApi, PostApi } from '@/api'
import imageIcon from '@/assets/image.svg'
import BackButton from '@/components/BackButton'
import NavigationBarTitle from '@/components/NavigationBarTitle'
import TextButton from '@/components/TextButton'
import usePostStore from '@/stores/postStore'
import type TPost from '@/types/Post'
import sleep from '@/utils/sleep'

const Add = () => {
  const [value, setValue] = useState('')
  const [image, setImage] = useState<string | undefined>(undefined)

  const handleAddImage = async () => {
    const res = await Taro.chooseImage({ count: 1 }).catch(() => {})
    if (!res?.tempFilePaths) {
      return
    }
    await Taro.showLoading({ title: '上传中' })
    const path = await ImageApi.uploadImage({ path: res.tempFilePaths[0] })
    setImage(path)
    Taro.hideLoading()
  }

  const setPosts = usePostStore(state => state.setPosts)

  const handleSendPost = async () => {
    const post = await PostApi.addPost({ content: value, image })
    await Taro.showToast({ title: '发送成功', icon: 'success', duration: 800 })
    await sleep(800)
    setPosts(p => [post, ...p] as TPost[])
    Taro.navigateBack()
  }

  return (
    <View>
      <View className='bg-gradient-to-b from-primary from-0% h-[406px] w-screen' />
      <NavigationBarTitle className='top-[214px]' text='发帖' />
      <BackButton className='top-[214px]' />
      <View className='h-[568px] mx-[40px] rounded-[30px] bg-white shadow-[0_8px_24px_0_#00000040] p-[30px] text-[24px] leading-[30.48px]'>
        <Textarea
          className='h-[250px] w-full text-[24px] leading-[30.48px]'
          maxlength={-1}
          value={value}
          onInput={e => setValue(e.detail.value)}
          placeholder='点此输入正文内容，正文不能为空'
          placeholderClass='text-[24px] leading-[30.48px] text-[#c6c6c6]'
        />
        <View
          className='flex flex-col justify-center items-center w-[230px] h-[230px] border-[2px] border-solid border-[#c6c6c6] rounded-[30px] mt-[30px]'
          onClick={handleAddImage}
        >
          {image ? (
            <Image
              src={image}
              className='w-[230px] h-[230px] border-[2px] border-solid border-[#c6c6c6] rounded-[30px]'
              mode='aspectFill'
            />
          ) : (
            <>
              <Image
                src={imageIcon}
                className='w-[64px] h-[64px]'
                mode='aspectFit'
              />
              <Text className='text-[24px] leading-[30.48px] text-[#c6c6c6] mt-[12px]'>
                点击添加图片
              </Text>
            </>
          )}
        </View>
      </View>
      <TextButton
        className='absolute bottom-[214px] left-1/2 -translate-x-1/2'
        text='发送'
        onClick={handleSendPost}
        disabled={!value}
      />
    </View>
  )
}

export default Add
