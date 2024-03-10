import { useEffect } from 'react'
import { useDidHide } from '@tarojs/taro'
import useUpdateCommentsStore from '@/stores/updateCommentsStore'

const useUpdateComments = (refresh: () => void) => {
  const shouldUpdateComments = useUpdateCommentsStore(state => state.update)

  useEffect(() => {
    if (shouldUpdateComments === 0) {
      return
    }
    refresh()
  }, [refresh, shouldUpdateComments])

  const reset = useUpdateCommentsStore(state => state.reset)

  useDidHide(() => reset())
}

export default useUpdateComments
