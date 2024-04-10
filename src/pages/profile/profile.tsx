import { View } from '@tarojs/components'
import type { ModifyType } from '@/common/settingsTitleMap'
import BackButton from '@/components/BackButton'
import NavigationBarTitle from '@/components/NavigationBarTitle'
import Title from '@/components/Title'
import SettingListItem from '@/components/profile/SettingListItem'
import useUserStore from '@/stores/userStore'
import getDocumentType from '@/utils/getDocumentType'
import getGender from '@/utils/getGender'
import orNotSet from '@/utils/orNotSet'
import { navigate } from '@/utils/routeTools'
import { getNationality } from '@/utils/getNationality'

const Profile = () => {
  const {
    name,
    gender,
    nationality,
    documentType,
    documentNumber,
    documentValidDate,
    phoneNumber,
    job,
    address
  } = useUserStore(state => ({
    name: state.name,
    gender: state.gender,
    nationality: state.nation,
    documentType: state.documentType,
    documentNumber: state.documentNumber,
    documentValidDate: state.documentValidDate,
    phoneNumber: state.phone,
    job: state.job,
    address: state.address
  }))

  const navigateTo = (type: ModifyType) => () =>
    navigate(`/pages/profile/modify/modify?type=${type}`)

  return (
    <View className='relative'>
      <View className='h-[406px] w-screen bg-gradient-to-b from-primary from-0%' />
      <NavigationBarTitle lower text='个人资料' />
      <BackButton lower />
      <View className='w-screen px-[40px]'>
        <Title text='基本信息' className='mb-[40px]' />
        <SettingListItem
          text='名字'
          value={orNotSet(name)}
          onClick={navigateTo('name')}
        />
        <SettingListItem
          text='性别'
          value={getGender(gender)}
          onClick={navigateTo('gender')}
        />
        <SettingListItem
          text='国籍'
          value={getNationality(nationality)}
          onClick={navigateTo('nation')}
        />
        <SettingListItem
          text='证件类型'
          value={getDocumentType(documentType)}
          onClick={navigateTo('documentType')}
        />
        <SettingListItem
          text='证件号码'
          value={orNotSet(documentNumber)}
          onClick={navigateTo('documentNumber')}
        />
        <SettingListItem
          text='证件有效期'
          value={orNotSet(documentValidDate)}
          onClick={navigateTo('documentValidDate')}
        />
        <Title text='补充信息' className='mb-[40px] mt-[60px]' />
        <SettingListItem
          text='电话号码'
          value={orNotSet(phoneNumber)}
          onClick={navigateTo('phone')}
        />
        <SettingListItem
          text='职业'
          value={orNotSet(job)}
          onClick={navigateTo('job')}
        />
        <SettingListItem
          text='联系地址'
          value={orNotSet(address)}
          onClick={navigateTo('address')}
        />
      </View>
    </View>
  )
}

export default Profile
