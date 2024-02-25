import type Taro from '@tarojs/taro'
import type { paths } from './schemas'

type Expand<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: Expand<O[K]> }
    : never
  : T
export type Result<T> = { code: number; data: T; msg: string }
type _HTTPOperations = 'get' | 'post' | 'put' | 'delete' | 'patch'
export type HTTPOperations = Uppercase<_HTTPOperations>
export type Paths = Expand<keyof paths>
type HTTPStatusCode =
  | '200'
  | '201'
  | '204'
  | '400'
  | '401'
  | '403'
  | '404'
  | '500'
type NoneNeverKeys<T> = {
  [P in keyof T]: T[P] extends never ? never : P
} extends { [key in keyof T]: infer U }
  ? U
  : never
type _Params<
  TPath extends Paths,
  TOperation extends HTTPOperations
> = paths[TPath] extends {
  [key in Lowercase<TOperation>]: {
    requestBody?: {
      content: { 'application/json'?: infer UBody1; '*/*'?: infer UBody2 }
    }
    parameters?: { query?: infer UQuery; path?: infer UPath }
  }
}
  ? {
      query: UQuery extends { [key: string]: any } ? UQuery : never
      path: UPath extends { [key: string]: any } ? UPath : never
      body: UBody1 & UBody2 extends { [key: string]: any }
        ? UBody1 & UBody2
        : never
    }
  : never
export type Params<TPath extends Paths, TOperation extends HTTPOperations> =
  NoneNeverKeys<_Params<TPath, TOperation>> extends never
    ? never
    : Expand<
        Pick<
          _Params<TPath, TOperation>,
          NoneNeverKeys<_Params<TPath, TOperation>>
        >
      >
export type Response<
  TPath extends Paths,
  TOperation extends HTTPOperations,
  TCode extends HTTPStatusCode = '200'
> = paths[TPath] extends {
  [key in Lowercase<TOperation>]: {
    responses: {
      [code in TCode]: {
        content: { 'application/json'?: infer URes1; '*/*'?: infer URes2 }
      }
    }
  }
}
  ? URes1 & URes2 extends infer R
    ? R extends Partial<Result<infer U>>
      ? U
      : never
    : never
  : never
export type Api<
  TPath extends Paths,
  TOperation extends HTTPOperations,
  TCode extends HTTPStatusCode = '200'
> = [Params<TPath, TOperation>, Response<TPath, TOperation, TCode>] extends [
  infer P,
  infer R
]
  ? Taro.request.SuccessCallbackResult<Result<R>> extends infer S
    ? [P] extends [never]
      ? [R] extends [never]
        ? { getRes: () => Promise<void>; getData: () => Promise<void> }
        : { getRes: () => Promise<S>; getData: () => Promise<R> }
      : P extends { query?: infer Q; path?: infer Pa; body?: infer B }
        ? [R] extends [never]
          ? {
              getRes: (params: P) => Promise<void>
              getData: (params: Q & Pa & B) => Promise<void>
            }
          : {
              getRes: (params: P) => Promise<S>
              getData: (params: Q & Pa & B) => Promise<R>
            }
        : never
    : never
  : never
