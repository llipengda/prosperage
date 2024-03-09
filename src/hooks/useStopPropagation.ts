import type { CommonEvent } from '@tarojs/components'

const useStopPropagation =
  <T>(callBack: (event: CommonEvent<T>) => void) =>
  (event: CommonEvent<T>) => {
    event.stopPropagation()
    callBack(event)
  }

export default useStopPropagation
