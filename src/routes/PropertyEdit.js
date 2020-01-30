import React from 'react'
import Header from '../containers/Header'
import PageContainer from '../components/PageContainer'
import PropertyForm from '../containers/PropertyForm'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'
import {
  DEFAULT_FORM_ERROR_MESSAGE,
  FORM_ERROR,
  trimStringValues,
} from '../components/Form'
import PrimaryTitle from '../components/PrimaryTitle'
import { useParams } from 'react-router'
import { Query } from '../components/Apollo'

const GET_PROPERTY = gql`
  query property($id: ID!) {
    property(id: $id) {
      id
      name
      address
      advantages
      area
      bathroomsCount
      bedroomsCount
      city
      disadvantages
      floor
      parking
      surface
      zipCode
    }
  }
`

const UPDATE_PROPERTY = gql`
  mutation updateProperty($propertyId: ID!, $property: PropertyInput!) {
    updateProperty(propertyId: $propertyId, property: $property) {
      id
      name
      address
      advantages
      area
      bathroomsCount
      bedroomsCount
      city
      disadvantages
      floor
      parking
      surface
      zipCode
    }
  }
`

export default function PropertyAdd(data) {
  const { propertyId } = useParams()
  // // const history = useHistory()
  const [updateProperty] = useMutation(UPDATE_PROPERTY)

  async function handleSubmit(mutation, propertyId, values) {
    try {
      const { id, __typename, ...formattedValues } = trimStringValues(values)
      mutation({
        variables: {
          propertyId,
          property: { ...formattedValues },
        },
      })
      // history.push(`/`)
    } catch (error) {
      return { [FORM_ERROR]: error || DEFAULT_FORM_ERROR_MESSAGE }
    }
  }

  return (
    <>
      <Header>Modifier opportunité</Header>
      <PageContainer>
        <PrimaryTitle>Modifier opportunité</PrimaryTitle>
        <Query
          query={GET_PROPERTY}
          fallback={<div>Loading...</div>}
          variables={{ id: propertyId }}
        >
          {({ data }) => (
            <PropertyForm
              property={data.property}
              onSubmit={values =>
                handleSubmit(updateProperty, data.property.id, values)
              }
              submitLabel="Modifier"
              submittingLabel="Modification en cours..."
            />
          )}
        </Query>
      </PageContainer>
    </>
  )
}
