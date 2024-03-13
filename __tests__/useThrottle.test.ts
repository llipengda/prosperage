import { act, renderHook } from '@testing-library/react'
import useThrottle from '@/hooks/useThrottle'

describe('useThrottle', () => {
  it('should throttle the function call', () => {
    const mockFn = jest.fn()
    const { result } = renderHook(() => useThrottle(mockFn, 1000))

    // Call the throttled function multiple times within the throttle time
    act(() => {
      result.current[0]()
      result.current[0]()
      result.current[0]()
    })

    // The function should only be called once
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should return the correct time left', () => {
    jest.useFakeTimers()

    const { result } = renderHook(() => useThrottle(() => {}, 2))

    // Initially, the time left should be 0
    expect(result.current[1]).toBe(0)

    // Call the throttled function
    act(() => {
      result.current[0]()
    })

    // After calling the function, the time left should be equal to the throttle time
    expect(result.current[1]).toBe(2)

    // Wait for 1 second
    act(() => jest.advanceTimersByTime(2000))

    // After 1 second, the time left should be 1
    expect(result.current[1]).toBe(1)
  })

  it('should not call the function if initiallyCallable is false', () => {
    const mockFn = jest.fn()
    const { result } = renderHook(() => useThrottle(mockFn, 1000, false))

    // Call the throttled function
    act(() => {
      result.current[0]()
    })

    // The function should not be called
    expect(mockFn).not.toHaveBeenCalled()
  })

  it('should reset the time left after the throttle time', () => {
    jest.useFakeTimers()

    const { result } = renderHook(() => useThrottle(() => {}, 10))

    // Call the throttled function
    act(() => {
      result.current[0]()
    })

    // After calling the function, the time left should be equal to the throttle time
    expect(result.current[1]).toBe(10)

    // Wait for the throttle time
    act(() => jest.advanceTimersByTime(10 * 1000))

    // After the throttle time, the time left should be 0
    expect(result.current[1]).toBe(0)
  })
})
