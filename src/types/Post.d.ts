import type { Expand, PostApi } from '@/api'

type TPost = Expand<
  Required<Awaited<ReturnType<(typeof PostApi)['getList']>>[number]>
>

export default TPost
