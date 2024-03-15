const getGender = (gender: number | string | undefined) => {
  switch (gender) {
    case 0:
    case '0':
      return '未设置'
    case 1:
    case '1':
      return '男'
    case 2:
    case '2':
      return '女'
    case 3:
    case '3':
      return '其他'
    default:
      return '未设置'
  }
}

export default getGender
