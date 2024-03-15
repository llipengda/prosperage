import { useState } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { UserApi } from '@/api'
import type { ModifyType } from '@/common/settingsTitleMap'
import settingsTitleMap from '@/common/settingsTitleMap'
import TextButton from '@/components/TextButton'
import SettingInput from '@/components/profile/SettingInput'
import useUserStore from '@/stores/userStore'
import sleep from '@/utils/sleep'

interface SingleInputSettingProps {
  type: ModifyType
}

const SingleInputSetting: React.FC<SingleInputSettingProps> = ({ type }) => {
  const initialValue = useUserStore(state => state[type])?.toString() || ''

  const [value, setValue] = useState(initialValue)

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
      <SettingInput
        value={value}
        placeholder={settingsTitleMap[type]}
        onSubmit={handleSubmit}
        onInput={setValue}
        onClear={() => setValue('')}
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

export default SingleInputSetting
