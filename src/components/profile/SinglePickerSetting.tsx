import { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { UserApi } from '@/api'
import type { ModifyType } from '@/common/settingsTitleMap'
import TextButton from '@/components/TextButton'
import SettingPicker from '@/components/profile/SettingPicker'
import useUserStore from '@/stores/userStore'
import sleep from '@/utils/sleep'

interface SinglePickerSettingProps {
  type: ModifyType
  range: string[]
}

const SinglePickerSetting: React.FC<SinglePickerSettingProps> = ({
  type,
  range
}) => {
  const initialValue = Number(useUserStore(state => state[type])) || 0

  const [value, setValue] = useState(initialValue as string | number)

  const update = useUserStore(state => state.update)

  const handleSubmit = async () => {
    await UserApi.update({ [type]: value })
    Taro.showToast({ title: '修改成功', icon: 'success', duration: 500 })
    update({ [type]: value })
    await sleep(500)
    Taro.navigateBack()
  }

  return (
    <View>
      <SettingPicker
        value={value}
        range={range}
        onChange={setValue}
        mode='selector'
      />
      <TextButton
        className='absolute bottom-[216px] left-1/2 -translate-x-[50%]'
        text='完成'
        onClick={handleSubmit}
        disabled={!value || value === initialValue}
      />
    </View>
  )
}

export default SinglePickerSetting
