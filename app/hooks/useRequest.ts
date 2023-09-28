import { useEffect, useState } from 'react'

type RequestUnion<Data> =
  | {
      state: 'idle'
      data: null
      error: null
    }
  | {
      state: 'loading'
      data: null
      error: null
    }
  | {
      state: 'done'
      data: Data
      error: null
    }
  | {
      state: 'done'
      data: null
      error: Error
    }

export function useRequest<Data>(
  info: RequestInfo,
  init?: RequestInit,
): RequestUnion<Data> {
  const [state, setState] = useState<RequestUnion<Data>>({
    state: 'idle',
    data: null,
    error: null,
  })

  useEffect(() => {
    setState({ state: 'idle', data: null, error: null })

    fetch(info, init)
      .then((response) => response.json())
      .then((data) => {
        setState({ state: 'done', data, error: null })
      })
      .catch((error) => {
        setState({ state: 'done', data: null, error })
      })
  }, [])

  return state
}
