import { useCallback, useEffect, useRef, useState } from 'react'

const useGetByPage = <
  T extends {},
  U extends { page: number; pageSize: number; [key: string]: any },
  P extends Partial<Record<keyof U, any>>
>(
  pageSize: number,
  getFunc: (params: U) => Promise<T[]>,
  moreParams?: P
) => {
  const [data, setData] = useState<Required<T>[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const index = useRef(0)

  const moreParamsRef = useRef(moreParams)

  const get = useCallback(async () => {
    setLoading(true)
    const res = await getFunc({
      page: index.current++,
      pageSize,
      ...moreParamsRef.current
    } as U)
    if (res.length < pageSize) {
      setHasMore(false)
    }
    setData(prev => [...prev, ...res] as Required<T>[])
    setLoading(false)
  }, [getFunc, pageSize])

  const refresh = useCallback(async () => {
    index.current = 0
    setHasMore(true)
    setRefreshing(true)
    setLoading(true)
    const res = await getFunc({
      page: index.current++,
      pageSize,
      ...moreParamsRef.current
    } as U)
    if (res.length < pageSize) {
      setHasMore(false)
    }
    setData(res as Required<T>[])
    setLoading(false)
    setRefreshing(false)
  }, [getFunc, pageSize])

  useEffect(() => {
    refresh()
  }, [refresh])

  return {
    data,
    setData,
    get,
    hasMore,
    setHasMore,
    loading,
    setLoading,
    refreshing,
    setRefreshing,
    refresh
  }
}

export default useGetByPage
