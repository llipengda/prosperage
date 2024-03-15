import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import BackButton from '@/components/BackButton'
import NavigationBarTitle from '@/components/NavigationBarTitle'
import type { ModifyType } from '@/pages/profile/profile'

const titleMap = {
  name: '修改名字',
  avatar: '修改头像',
  nationality: '修改国籍',
  documentType: '修改证件类型',
  documentNumber: '修改证件号码',
  documentValidDate: '修改证件有效期',
  job: '修改职业',
  address: '修改地址',
  phone: '修改手机号',
  gender: '修改性别'
} satisfies Record<ModifyType, string>

const modify = () => {
  const type = (Taro.getCurrentInstance().router?.params.type ||
    'name') as ModifyType

  return (
    <View>
      <View className='w-screen bg-primary h-[326px]' />
      <BackButton lower />
      <NavigationBarTitle lower text={titleMap[type]} />
      <View>{type}</View>
    </View>
  )
}

export default modify
