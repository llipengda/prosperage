import { type ReactElement, useEffect, useRef } from 'react'
import React from 'react'
import type { PageContainerProps } from '@tarojs/components'
import { mountToPage, unmountFromPage } from '@/utils/DOMTools'

const useFloatLayout = (element: ReactElement) => {
  const floatLayoutIdRef = useRef<string | null>(null)

  const unmount = () => {
    if (floatLayoutIdRef.current) {
      unmountFromPage(floatLayoutIdRef.current)
      floatLayoutIdRef.current = null
    }
  }

  const mount = () => {
    if (floatLayoutIdRef.current) {
      return
    }
    floatLayoutIdRef.current = mountToPage(
      React.createElement<PageContainerProps>(
        'page-container',
        { show: true, round: true, onAfterLeave: unmount },
        React.createElement(
          element.type,
          {
            ...element.props,
            onClose: unmount
          },
          null
        )
      )
    )
  }

  useEffect(() => {
    return () => {
      unmount()
    }
  }, [])

  return [mount, unmount] as const
}

export default useFloatLayout
