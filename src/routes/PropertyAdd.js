import React from 'react'
import Header from '../containers/Header'
import PageContainer from '../components/PageContainer'
import Loader from '../components/Loader'
import PropertyForm from '../containers/PropertyForm'
import gql from 'graphql-tag'
import { useHistory } from 'react-router'
import { useMutation } from 'react-apollo'
import {
  DEFAULT_FORM_ERROR_MESSAGE,
  FORM_ERROR,
  trimStringValues,
} from '../components/Form'
import PrimaryTitle from '../components/PrimaryTitle'

const CREATE_PROPERTY = gql`
  mutation createProperty($newProperty: PropertyInput!) {
    createProperty(newProperty: $newProperty) {
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
function confirm(history, data) {
  history.push(`/`)
}

export default function PropertyAdd({ data }) {
  const history = useHistory()
  const [createProperty] = useMutation(CREATE_PROPERTY, {
    onCompleted: data => confirm(history, data.property),
  })

  async function handleSubmit(mutation, values) {
    try {
      const formattedValues = trimStringValues(values)
      mutation({ variables: { newProperty: { ...formattedValues } } })
    } catch (error) {
      return { [FORM_ERROR]: error || DEFAULT_FORM_ERROR_MESSAGE }
    }
  }

  return (
    <>
      <Header>Nouvelle opportunité</Header>
      <PageContainer>
        <PrimaryTitle>Nouvelle opportunité</PrimaryTitle>
        {!data || data.property ? (
          <PropertyForm
            onSubmit={values => handleSubmit(createProperty, values)}
            submitLabel="Ajouter"
            submittingLabel="Ajout en cours..."
          />
        ) : (
          <Loader />
        )}
      </PageContainer>
    </>
  )
}
