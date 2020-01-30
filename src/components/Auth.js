import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from './Apollo'

const AuthContext = React.createContext()

const USER_QUERY = gql`
  query User {
    user {
      id
      name
      email
    }
  }
`

export default function AuthProvider({
  children,
  fetchPolicy = 'cache-and-network',
}) {
  const [user, setUser] = useState()

  const { loading, data } = useQuery(USER_QUERY, { fetchPolicy })
  if (!data && loading) return null

  function login(data) {
    const user = {
      token: data.token,
      ...data.user,
    }
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user: user || data.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useUser() {
  return React.useContext(AuthContext)
}
