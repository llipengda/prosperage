import { useCallback, useEffect, useRef, useState } from 'react'
import type { Expand } from '@/api'
import type useGetByPage from '@/hooks/useGetByPage'

type SwitchData<
  T extends {},
  U extends { page: number; pageSize: number; [key: string]: unknown },
  P extends Partial<Omit<U, 'page' | 'pageSize'>>,
  S extends Expand<Required<T>[]>
> = ReturnType<typeof useGetByPage<T, U, P, S>>

const useSwitch = <
  T extends {},
  U extends { page: number; pageSize: number; [key: string]: unknown },
  P extends Partial<Omit<U, 'page' | 'pageSize'>>,
  S extends Expand<Required<T>[]>
>(
  ...datas: SwitchData<T, U, P, S>[]
) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentData = datas[currentIndex]

  const initRefreshRef = useRef(datas[0].refresh)

  const switchTo = useCallback(
    (i: number) => {
      datas[i].refresh()
      setCurrentIndex(i)
    },
    [datas]
  )

  useEffect(() => {
    initRefreshRef.current()
  }, [])

  return [currentData, currentIndex, switchTo] as const
}

export default useSwitch
