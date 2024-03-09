import {
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import React from 'react'
import { PageContainer, type PageContainerProps } from '@tarojs/components'
import { mountToPage, unmountFromPage } from '@/utils/DOMTools'
import sleep from '@/utils/sleep'

const useFloatLayout = (element: ReactElement, duration: number = 300) => {
  const floatLayoutIdRef = useRef<string | null>(null)
  const elementRef = useRef(element)

  const unmount = useCallback(() => {
    if (floatLayoutIdRef.current) {
      unmountFromPage(floatLayoutIdRef.current)
      floatLayoutIdRef.current = null
    }
  }, [])

  const mount = useCallback(() => {
    if (floatLayoutIdRef.current) {
      return
    }

    const Wrapper = () => {
      const [show, setShow] = useState(true)

      const handleClose = async () => {
        setShow(false)
        await sleep(duration)
        unmount()
      }

      return React.createElement<PageContainerProps>(
        PageContainer,
        { show: show, round: true, onAfterLeave: unmount, duration },
        React.createElement(
          elementRef.current.type,
          {
            ...elementRef.current.props,
            onClose: handleClose
          },
          elementRef.current.props.children ?? null
        )
      )
    }

    floatLayoutIdRef.current = mountToPage(React.createElement(Wrapper))
  }, [duration, unmount])

  useEffect(() => {
    return () => {
      unmount()
    }
  }, [unmount])

  return [mount, unmount] as const
}

export default useFloatLayout
