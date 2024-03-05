import type { PostApi } from '@/api'

type TPost = Required<Awaited<ReturnType<(typeof PostApi)['getList']>>[number]>

export default TPost
