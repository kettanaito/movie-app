import { type Fetcher } from '@remix-run/react'

export function getOptimisticData<Data>(
  fetcher?: Fetcher<Data>,
): Data | undefined {
  if (typeof fetcher === 'undefined') {
    return
  }

  if (fetcher.state === 'idle') {
    return fetcher.data
  }

  return
}
