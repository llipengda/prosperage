import type Taro from '@tarojs/taro'
import type { paths } from '@/api/schema'
import { Expand } from '@/types/expand'
import { Result } from '@/types/result'

type _HTTPOperations = 'get' | 'post' | 'put' | 'delete' | 'patch'

type HTTPOperations = Expand<Uppercase<_HTTPOperations> | _HTTPOperations>

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
  TPath extends keyof paths,
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

export type Params<
  TPath extends keyof paths,
  TOperation extends HTTPOperations
> = NoneNeverKeys<_Params<TPath, TOperation>> extends never
  ? never
  : Expand<
      Pick<
        _Params<TPath, TOperation>,
        NoneNeverKeys<_Params<TPath, TOperation>>
      >
    >

export type Response<
  TPath extends keyof paths,
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
  TPath extends keyof paths,
  TOperation extends HTTPOperations,
  TCode extends HTTPStatusCode = '200'
> = [Params<TPath, TOperation>, Response<TPath, TOperation, TCode>] extends [
  infer P,
  infer R
]
  ? P extends never
    ? () => Promise<R>
    : P extends {
        query?: infer Q
        path?: infer Pa
        body?: infer B
      }
    ? (params: Q & Pa & B) => Promise<R>
    : never
  : never

export type InternalApi<
  TPath extends keyof paths,
  TOperation extends HTTPOperations,
  TCode extends HTTPStatusCode = '200'
> = [Params<TPath, TOperation>, Response<TPath, TOperation, TCode>] extends [
  infer P,
  infer R
]
  ? Taro.request.SuccessCallbackResult<Result<R>> extends infer S
    ? P extends never
      ? () => Promise<S>
      : (params: P) => Promise<S>
    : never
  : never
