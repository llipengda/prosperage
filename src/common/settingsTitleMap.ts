export type ModifyType =
  | 'name'
  | 'avatar'
  | 'phone'
  | 'gender'
  | 'nation'
  | 'documentType'
  | 'documentNumber'
  | 'documentValidDate'
  | 'job'
  | 'address'

const settingsTitleMap: Record<ModifyType, string> = {
  name: '修改名字',
  avatar: '修改头像',
  nation: '修改国籍',
  documentType: '修改证件类型',
  documentNumber: '修改证件号码',
  documentValidDate: '修改证件有效期',
  job: '修改职业',
  address: '修改地址',
  phone: '修改手机号',
  gender: '修改性别'
} as const

export default settingsTitleMap
