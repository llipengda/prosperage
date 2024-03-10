import { useCallback, useEffect, useRef, useState } from 'react'
import type useGetByPage from '@/hooks/useGetByPage'

type SwitchData<
  T extends {},
  U extends { page: number; pageSize: number; [key: string]: any },
  P extends Partial<Record<keyof U, any>>
> = ReturnType<typeof useGetByPage<T, U, P>>

const useSwitch = <
  T extends {},
  U extends { page: number; pageSize: number; [key: string]: any },
  P extends Partial<Record<keyof U, any>>
>(
  ...datas: SwitchData<T, U, P>[]
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
