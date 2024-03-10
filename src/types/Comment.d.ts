import type { CommentApi, Expand } from '@/api'

type TComment = Expand<
  Required<Awaited<ReturnType<(typeof CommentApi)['getList']>>[number]>
>

export default TComment
