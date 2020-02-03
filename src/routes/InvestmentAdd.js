import React from 'react'
import Header from '../containers/Header'
import PageContainer from '../components/PageContainer'
import Loader from '../components/Loader'
import InvestmentForm from '../containers/InvestmentForm'
import gql from 'graphql-tag'
import { useHistory } from 'react-router'
import { useMutation } from 'react-apollo'
import {
  DEFAULT_FORM_ERROR_MESSAGE,
  FORM_ERROR,
  trimStringValues,
} from '../components/Form'
import PrimaryTitle from '../components/PrimaryTitle'

const CREATE_Investment = gql`
  mutation createInvestment($newInvestment: InvestmentInput!) {
    createInvestment(newInvestment: $newInvestment) {
      id
    }
  }
`
function confirm(history, data) {
  history.push(`/`)
}

export default function InvestmentAdd({ data }) {
  const history = useHistory()
  const [createInvestment] = useMutation(CREATE_Investment, {
    onCompleted: data => confirm(history, data.Investment),
  })

  async function handleSubmit(mutation, values) {
    try {
      const formattedValues = trimStringValues(values)
      mutation({ variables: { newInvestment: { ...formattedValues } } })
    } catch (error) {
      return { [FORM_ERROR]: error || DEFAULT_FORM_ERROR_MESSAGE }
    }
  }

  return (
    <>
      <Header>Nouvel Investissement</Header>
      <PageContainer>
        <PrimaryTitle>Nouvel Investissement</PrimaryTitle>
        {!data || data.Investment ? (
          <InvestmentForm
            onSubmit={values => handleSubmit(createInvestment, values)}
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
