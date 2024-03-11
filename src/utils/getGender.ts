const getGender = (gender: number | undefined) => {
  switch (gender) {
    case 0:
      return '未设置'
    case 1:
      return '男'
    case 2:
      return '女'
    case 3:
      return '其他'
    default:
      return '未设置'
  }
}

export default getGender
