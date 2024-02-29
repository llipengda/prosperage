import { useEffect } from 'react'
import { type Page } from '@/app.config'
import { redirect as _redirect, navigate } from '../utils/navigate'

type ToPage = {
  [key in Page]: `/${key}` | `/${key}?${string}`
}[Page]

type NavigateProps = {
  to: ToPage
  delay?: number
  redirect?: boolean
}

export default function Navigate({
  to,
  delay = 0,
  redirect = false
}: NavigateProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      redirect ? _redirect(to) : navigate(to)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay, to, redirect])

  return <></>
}
