import { useState, useEffect } from 'react'
import { request } from 'graphql-request'

interface QueryOptions<VariablesType extends Record<string, any>> {
  variables?: VariablesType
}

type QueryState<QueryType extends Record<string, any>> =
  | {
      loading: true
      data: null
      error: null
    }
  | {
      loading: false
      data: QueryType
      error: null
    }
  | {
      loading: false
      data: null
      error: Error
    }

export function useQuery<
  QueryType extends Record<string, any>,
  VariablesType extends Record<string, any> = {},
>(
  query: string,
  options?: QueryOptions<VariablesType>,
): [
  QueryState<QueryType>,
  {
    updateCache: (updateFn: (data: QueryType) => QueryType) => void
  },
] {
  const [state, setState] = useState<QueryState<QueryType>>({
    loading: true,
    data: null,
    error: null,
  })

  useEffect(() => {
    request<QueryType>({
      url: 'http://localhost:3000',
      document: query,
      variables: options?.variables,
    }).then(
      (data) => {
        setState({
          loading: false,
          data,
          error: null,
        })
      },
      (error) => {
        setState({
          loading: false,
          error: error.response.errors[0],
          data: null,
        })
      },
    )
  }, [])

  return [
    state,
    {
      updateCache(updateFn) {
        if (!state.loading && !state.error) {
          setState({ ...state, data: updateFn(state.data) })
        }
      },
    },
  ]
}

interface MutationOptions<VariablesType extends Record<string, any>> {
  variables?: VariablesType
}

type MutationState<MutationType extends Record<string, any>> =
  | {
      data: MutationType
      error: null
    }
  | {
      data: null
      error: Error
    }

export function mutate<
  MutationType extends Record<string, any>,
  VariablesType extends Record<string, any> = {},
>(mutation: string) {
  return (
    options?: MutationOptions<VariablesType>,
  ): Promise<MutationState<MutationType>> => {
    return request<MutationType>({
      url: 'http://localhost:3000',
      document: mutation,
      variables: options?.variables,
    }).then(
      (data) => ({ data, error: null }),
      (error) => ({ data: null, error }),
    )
  }
}
