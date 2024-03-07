import type { CommentApi } from '@/api'

type TComment = Required<
  Awaited<ReturnType<(typeof CommentApi)['getList']>>[number]
>

export default TComment
