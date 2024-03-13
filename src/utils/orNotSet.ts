const orNotSet = <T extends {}>(value: T | null | undefined) => {
  return value || '未设置'
}

export default orNotSet
