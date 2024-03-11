export const BASE_URL = 'https://api.crazyforlove.fun'
export const OPEN_API_URL = BASE_URL + '/v3/api-docs/api'
export const DEFAULT_NAME = '微信用户'
export const DEFAULT_AVATAR = BASE_URL + '/static/1.jpg'
export const POSTS_PER_PAGE = 15
export const COMMENTS_PER_PAGE = 15
export const REPLIES_PER_PAGE = 15
export const VALIDATED_DOCUMENT_TYPES = [
  '居民身份证',
  '港澳居民往来内地通行证',
  '台湾居民来往大陆通行证',
  '护照',
  '其他'
] as const
