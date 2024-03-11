import { VALIDATED_DOCUMENT_TYPES } from '@/common/constants'

const getDocumentType = (value: number | undefined) => {
  const table = ['未设置'].concat(VALIDATED_DOCUMENT_TYPES)
  return table[value ?? 0]
}

export default getDocumentType
