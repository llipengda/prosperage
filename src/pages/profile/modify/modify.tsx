import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { VALIDATED_DOCUMENT_TYPES } from '@/common/constants'
import settingsTitleMap, { type ModifyType } from '@/common/settingsTitleMap'
import BackButton from '@/components/BackButton'
import NavigationBarTitle from '@/components/NavigationBarTitle'
import SingleInputSetting from '@/components/profile/SingleInputSetting'
import SinglePickerSetting from '@/components/profile/SinglePickerSetting'
import ValidDateSetting from '@/components/profile/ValidDateSetting'

const Setting = ({ type }: { type: ModifyType }) => {
  switch (type) {
    case 'gender':
      return (
        <SinglePickerSetting
          type={type}
          range={['未设置', '男', '女', '其它']}
        />
      )
    case 'documentType':
      return (
        <SinglePickerSetting
          type={type}
          range={['未设置'].concat(VALIDATED_DOCUMENT_TYPES)}
        />
      )
    case 'nation':
      return (
        <SinglePickerSetting
          type={type}
          range={['未设置', '中华人民共和国', '其它']}
        />
      )
    case 'documentValidDate':
      return <ValidDateSetting />

    default:
      return <SingleInputSetting type={type} />
  }
}

const modify = () => {
  const type = (Taro.getCurrentInstance().router?.params.type ||
    'name') as ModifyType

  return (
    <View>
      <View className='w-screen bg-primary h-[326px]' />
      <BackButton lower text='取消' />
      <NavigationBarTitle lower text={settingsTitleMap[type]} />
      <View className='pt-[50px]'>
        <Setting type={type} />
      </View>
    </View>
  )
}

export default modify
