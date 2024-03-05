import type { Expand, UserApi } from '@/api'

type TUser = Expand<Awaited<ReturnType<(typeof UserApi)['info']>>>

export default TUser
