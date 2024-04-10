export const getNationality = (value: number | string | undefined) => {
  const table = ['未设置', '中华人民共和国', '其他']
  return table[Number(value) ?? 0]
}
