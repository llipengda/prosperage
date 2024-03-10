import type { Expand, ReplyApi } from '@/api'

type TReply = Expand<
  Required<Awaited<ReturnType<(typeof ReplyApi)['getList']>>[number]>
>

export default TReply
