const maxLength = (max: number) => (value: string) => {
  return value.length <= max ? value : value.substring(0, max) + '...'
}

export default maxLength
