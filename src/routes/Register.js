import React from 'react'
import Header from '../containers/Header'
import PageContainer from '../components/PageContainer'
import UserForm from '../containers/UserForm'
import gql from 'graphql-tag'
import { useHistory } from 'react-router'
import { useMutation } from 'react-apollo'
import {
  DEFAULT_FORM_ERROR_MESSAGE,
  FORM_ERROR,
  trimStringValues,
} from '../components/Form'
import PrimaryTitle from '../components/PrimaryTitle'
import { useUser } from '../components/Auth'

const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

async function confirm(history, userContext, data) {
  userContext.login(data)
  history.push(`/`)
}

export default function Register({ data }) {
  const history = useHistory()
  const userContext = useUser()

  const [signupMutation] = useMutation(SIGNUP_MUTATION, {
    onCompleted: data => confirm(history, userContext, data.signup),
  })

  async function handleSubmit(mutation, values) {
    try {
      const formattedValues = trimStringValues(values)
      return mutation({ variables: { ...formattedValues } })
    } catch (error) {
      return { [FORM_ERROR]: error || DEFAULT_FORM_ERROR_MESSAGE }
    }
  }

  return (
    <>
      <Header>Inscription</Header>
      <PageContainer>
        <PrimaryTitle>Inscription</PrimaryTitle>
        <UserForm
          action="register"
          onSubmit={values => handleSubmit(signupMutation, values)}
          submitLabel="S'inscrire"
          submittingLabel="Inscription en cours..."
        />
      </PageContainer>
    </>
  )
}
