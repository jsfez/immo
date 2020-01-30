import React from 'react'
import { Query } from '../components/Apollo'
import { PropertyList } from '../components/PropertyList'
import Header from './Header'
import gql from 'graphql-tag'
import PrimaryTitle from '../components/PrimaryTitle'
import PageContainer from '../components/PageContainer'
import { useUser } from '../components/Auth'

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
  const userContext = useUser()

  console.log(userContext)
  if (logout) {
    userContext.logout()
  }

  return (
    <>
      <Header>Home</Header>
      <PageContainer>
        <PrimaryTitle>Home</PrimaryTitle>
        <Query query={PROPERTIES_QUERY} fallback={<div>Loading...</div>}>
          {({ data }) => <PropertyList data={data} />}
        </Query>
      </PageContainer>
    </>
  )
}
