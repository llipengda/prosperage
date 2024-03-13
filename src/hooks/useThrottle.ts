import { useEffect, useState } from 'react'

const useThrottle = <T extends unknown[], U>(
  fn: (...args: T) => U,
  time: number,
  initiallyCallable = true
) => {
  const [isThrottled, setIsThrottled] = useState<boolean>(!initiallyCallable)
  const [timeLeft, setTimeLeft] = useState<number>(initiallyCallable ? 0 : time)

  useEffect(() => {
    let timer: NodeJS.Timeout
    let interval: NodeJS.Timeout
    if (isThrottled) {
      timer = setTimeout(() => {
        setIsThrottled(false)
        setTimeLeft(0)
      }, timeLeft * 1000)
      interval = setInterval(() => {
        setTimeLeft(prevTimeLeft => Math.max(0, prevTimeLeft - 1))
      }, 1000)
    }
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [isThrottled, timeLeft])

  const throttledFunction = (...args: T) => {
    if (!isThrottled) {
      setIsThrottled(true)
      setTimeLeft(time)
      return fn(...args)
    }
    return null
  }

  return [throttledFunction, timeLeft] as const
}

export default useThrottle
