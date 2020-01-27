import React from 'react'
import { Query } from '../components/Apollo'
import { PropertyList } from '../components/PropertyList'
import gql from 'graphql-tag'
import { Helmet } from 'react-helmet'

const PROPERTIES_QUERY = gql`
  query properties {
    properties {
      id
      name
      surface
    }
  }
`

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Query query={PROPERTIES_QUERY} fallback={<div>Loading...</div>}>
        {({ data }) => <PropertyList data={data} />}
      </Query>
    </>
  )
}
