import React from 'react'
import { Query } from '../components/Apollo'
import { PropertyList } from '../components/PropertyList'
import Header from './Header'
import gql from 'graphql-tag'
import { Text } from '../components/Text'
import PageContainer from '../components/PageContainer'
import { AUTH_TOKEN } from '../constants'

const PROPERTIES_QUERY = gql`
  query properties {
    properties {
      id
      name
      surface
    }
  }
`

export default function Home({ logout, ...props }) {
  if (logout) {
    localStorage.removeItem(AUTH_TOKEN)
  }
  return (
    <>
      <Header>Home</Header>
      <PageContainer>
        <Text variant="h1">Home</Text>
        <Query query={PROPERTIES_QUERY} fallback={<div>Loading...</div>}>
          {({ data }) => <PropertyList data={data} />}
        </Query>
      </PageContainer>
    </>
  )
}
