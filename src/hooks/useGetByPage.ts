import { useCallback, useEffect, useRef, useState } from 'react'
import type { Expand } from '@/api'

const useGetByPage = <
  T extends {},
  U extends { page: number; pageSize: number; [key: string]: unknown },
  P extends Partial<Omit<U, 'page' | 'pageSize'>>,
  S extends Expand<Required<T>[]>
>(
  pageSize: number,
  getFunc: (params: U) => Promise<T[] | S>,
  autoCall: boolean,
  setDataFunc: {
    (data: S): void
    (fn: (data: S) => S): void
  },
  moreParams?: P
) => {
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const index = useRef(1)

  const moreParamsRef = useRef(moreParams)

  const get = useCallback(async () => {
    if (loading || !hasMore) {
      return
    }
    setLoading(true)
    const res = await getFunc({
      page: index.current++,
      pageSize,
      ...moreParamsRef.current
    } as U)
    if (res.length < pageSize) {
      setHasMore(false)
    }
    setDataFunc(prev => [...prev, ...res] as S)
    setLoading(false)
  }, [getFunc, hasMore, loading, pageSize, setDataFunc])

  const refresh = useCallback(async () => {
    index.current = 1
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
    setDataFunc(res as S)
    setLoading(false)
    setRefreshing(false)
  }, [getFunc, pageSize, setDataFunc])

  useEffect(() => {
    if (autoCall) {
      refresh()
    }
  }, [autoCall, refresh])

  return {
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
