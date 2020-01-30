import React from 'react'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import {
  useQuery as useApolloQuery,
  ApolloProvider as Apollo,
} from '@apollo/react-hooks'

export function useQuery(...args) {
  const { error, ...others } = useApolloQuery(...args)
  if (error) {
    // We only throw if there is no data
    if (!others.data) {
      throw error
    }
    // eslint-disable-next-line no-console
    console.error(error)
  }
  return others
}

export function Query({ children, fallback = null, query, ...props }) {
  const { loading, ...others } = useQuery(query, props)
  if (loading && !others.data) return fallback
  return children(others)
}

const authLink = setContext((_, { headers }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = user ? user.token : null
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default function ApolloProvider({ children }) {
  if (!client) return null
  return <Apollo client={client}>{children}</Apollo>
}
