import { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { UserApi } from '@/api'
import TextButton from '@/components/TextButton'
import SettingPicker from '@/components/profile/SettingPicker'
import useUserStore from '@/stores/userStore'
import errorModal from '@/utils/errorModal'

const ValidDateSetting = () => {
  const originalDocumentValidDate =
    useUserStore(state => state.documentValidDate) || ''
  const originalStartDate = originalDocumentValidDate.split('--')[0]
  const originalEndDate = originalDocumentValidDate.split('--')[1]

  const [startDate, setStartDate] = useState(originalStartDate)
  const [endDate, setEndDate] = useState(originalEndDate)
  const [longTerm, setLongTerm] = useState(originalEndDate === '长期有效')

  const update = useUserStore(state => state.update)

  const handleSubmit = async () => {
    if (startDate && (longTerm || endDate)) {
      if (!longTerm && new Date(startDate) > new Date(endDate)) {
        await errorModal('结束日期不能晚于开始日期')
        return
      }
      const documentValidDate =
        startDate + (longTerm ? '--长期有效' : `--${endDate}`)
      await UserApi.update({ documentValidDate })
      update({ documentValidDate })
      await Taro.navigateBack()
    }
  }

  return (
    <View>
      <View className='mx-[40px] text-[40px] leading-[50.8px] font-bold mb-[20px]'>
        开始于
      </View>
      <SettingPicker
        mode='date'
        value={startDate}
        onChange={v => setStartDate(v as string)}
      />
      <View className='mx-[40px] text-[40px] leading-[50.8px] font-bold mt-[40px] mb-[20px] flex flex-row'>
        结束于
        <View
          className='ml-[20px] font-normal text-[28px] leading-[36.4px] flex flex-row items-center cursor-pointer'
          onClick={() => setLongTerm(v => !v)}
        >
          <View
            className={`h-[30px] w-[30px] ${longTerm ? 'bg-primary' : 'bg-[#c6c6c6]'} rounded-full mr-[10px]`}
          />
          长期有效
        </View>
      </View>
      {!longTerm && (
        <SettingPicker
          mode='date'
          value={endDate}
          onChange={v => setEndDate(v as string)}
        />
      )}
      <TextButton
        className='absolute bottom-[216px] left-1/2 -translate-x-[50%]'
        text='完成'
        onClick={handleSubmit}
        disabled={!startDate || (longTerm ? false : !endDate)}
      />
    </View>
  )
}

export default ValidDateSetting
