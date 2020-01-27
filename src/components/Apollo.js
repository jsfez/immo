import React from 'react'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {
  useQuery as useApolloQuery,
  ApolloProvider as Apollo,
} from '@apollo/react-hooks'
// export { useMutation } from '@apollo/react-hooks'

export function Query({ children, fallback = null, query, ...props }) {
  const { error, loading, ...others } = useApolloQuery(query, props)
  if (error) {
    // We only throw if there is no data
    if (!others.data) throw error
    // eslint-disable-next-line no-console
    console.error(error)
  }
  if (loading && !others.data) return fallback
  return children(others)
}

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:4000',
  }),
  cache: new InMemoryCache(),
})

export default function ApolloProvider({ children }) {
  if (!client) return null
  return <Apollo client={client}>{children}</Apollo>
}
