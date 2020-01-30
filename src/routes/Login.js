import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Header from '../containers/Header'
import UserForm from '../containers/UserForm'
import { useUser } from '../components/Auth'
import {
  DEFAULT_FORM_ERROR_MESSAGE,
  FORM_ERROR,
  trimStringValues,
} from '../components/Form'
import PageContainer from '../components/PageContainer'
import PrimaryTitle from '../components/PrimaryTitle'

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

export default function Login({ loginForm = false }) {
  const history = useHistory()
  const userContext = useUser()

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onCompleted: data => confirm(history, userContext, data.login),
  })

  async function handleSubmit(mutation, values) {
    try {
      const formattedValues = trimStringValues(values)
      mutation({ variables: { ...formattedValues } })
      history.push(`/`)
    } catch (error) {
      return { [FORM_ERROR]: error || DEFAULT_FORM_ERROR_MESSAGE }
    }
  }

  return (
    <>
      <Header>Connexion</Header>
      <PageContainer>
        <PrimaryTitle>Connexion</PrimaryTitle>
        <UserForm
          action="login"
          onSubmit={values => handleSubmit(loginMutation, values)}
          submitLabel="Connexion"
          submittingLabel="Connexion en cours..."
        />
      </PageContainer>
    </>
  )
}
