import type { CommonEvent } from '@tarojs/components'

const useStopPropagation =
  <T extends {}>(callBack: (event: CommonEvent<T>) => void) =>
  (event: CommonEvent<T>) => {
    event.stopPropagation()
    callBack(event)
  }

export default useStopPropagation
