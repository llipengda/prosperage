import { useEffect } from 'react'
import { type Page } from '@/app.config'
import { navigate } from '../utils/navigate'

type ToPage = {
  [key in Page]: `/${key}` | `/${key}?${string}`
}[Page]

type NavigateProps = {
  to: ToPage
  delay?: number
}

export default function Navigate({ to, delay = 0 }: NavigateProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(to)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay, to])

  return <></>
}
