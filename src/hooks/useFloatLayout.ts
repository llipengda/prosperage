import {
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import React from 'react'
import { PageContainer, type PageContainerProps } from '@tarojs/components'
import { mountToPage, unmountAtId } from '@/utils/DOMTools'
import sleep from '@/utils/sleep'

const useFloatLayout = (element: ReactElement, duration: number = 300) => {
  const PageContainerWrapperRef = useRef<string | null>(null)
  const elementRef = useRef(element)
  const mountedIdsRef = useRef<string[]>([])

  const mayLeadToBadPerformanceUnmount = useCallback(() => {
    if (PageContainerWrapperRef.current) {
      unmountAtId(PageContainerWrapperRef.current)
      PageContainerWrapperRef.current = null
    }
  }, [])

  const mayLeadToBadPerformanceUnmountAll = useCallback(() => {
    mountedIdsRef.current.forEach(id => {
      unmountAtId(id)
    })
  }, [])

  const mount = useCallback(() => {
    if (PageContainerWrapperRef.current) {
      return
    }

    const Wrapper = () => {
      const [show, setShow] = useState(false)
      const [unmounted, setUnmounted] = useState(false)

      useEffect(() => {
        sleep(0).then(() => setShow(true))
      }, [])

      const handleClose = async () => {
        setShow(false)
        await sleep(duration)
        setUnmounted(true)
        PageContainerWrapperRef.current = null
      }

      return unmounted
        ? null
        : React.createElement<PageContainerProps>(
            PageContainer,
            { show, round: true, onAfterLeave: handleClose, duration },
            React.createElement(
              elementRef.current.type,
              {
                ...elementRef.current.props,
                onClose: handleClose
              },
              elementRef.current.props.children
            )
          )
    }

    PageContainerWrapperRef.current = mountToPage(React.createElement(Wrapper))

    mountedIdsRef.current.push(PageContainerWrapperRef.current)
  }, [duration])

  useEffect(() => {
    return () => mayLeadToBadPerformanceUnmountAll()
  }, [mayLeadToBadPerformanceUnmountAll])

  return [
    mount,
    mayLeadToBadPerformanceUnmountAll,
    mayLeadToBadPerformanceUnmount
  ] as const
}

export default useFloatLayout
