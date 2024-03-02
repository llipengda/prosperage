import { StateCreator, StoreMutatorIdentifier } from 'zustand'

export type Logger = <
  T extends unknown,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T extends unknown>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    if (process.env.NODE_ENV === 'production') {
      set(...a)
      return
    }
    console.groupCollapsed('Zustand store update')
    console.log('Arguments:', ...a)
    console.log('before:')
    console.log(...(name ? [`${name}:`] : []), get())
    set(...a)
    console.log('after:')
    console.log(...(name ? [`${name}:`] : []), get())
    console.groupEnd()
  }
  store.setState = loggedSet

  return f(loggedSet, get, store)
}

const logger = loggerImpl as unknown as Logger

export default logger
