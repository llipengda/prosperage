export type Result<T> = {
  code: number | string
  data: T
  msg: string
}
