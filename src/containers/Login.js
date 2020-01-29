import React from 'react'
import {
  Form,
  FORM_ERROR,
  FormErrorAlert,
  SubmitButton,
  DEFAULT_FORM_ERROR_MESSAGE,
  FormSuccessAlert,
} from '../components/Form'
import { InputField } from '../components/Field'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Box } from '@xstyled/styled-components'
import { Text } from '../components/Text'
import { AUTH_TOKEN } from '../constants'
import Header from './Header'
import PageContainer from '../components/PageContainer'

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

async function confirm(history, data) {
  const token = data.login.token
  localStorage.setItem(AUTH_TOKEN, token)
  history.push(`/`)
}

async function handleSubmit(login, values) {
  try {
    return login({ variables: { ...values } })
  } catch (error) {
    return { [FORM_ERROR]: DEFAULT_FORM_ERROR_MESSAGE }
  }
}

function PropertyForm() {
  const history = useHistory()
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: data => confirm(history, data),
  })

  return (
    <>
      <Header>Connexion</Header>
      <PageContainer>
        <Text variant="h1">Connexion</Text>
        <Form onSubmit={values => handleSubmit(login, values)}>
          <Box row>
            <Box col={{ xs: 1, md: 1 / 2 }}>
              <InputField
                type="text"
                label="Adresse email"
                name="email"
                required
                horizontal
              />
              <InputField
                type="password"
                label="Mot de passe"
                name="password"
                required
                horizontal
              />
            </Box>
            <Box col></Box>
            <Box>
              <SubmitButton mx={0}>Se connecter</SubmitButton>
            </Box>
          </Box>
          <FormErrorAlert />
          <FormSuccessAlert>Vous êtes connecté</FormSuccessAlert>
        </Form>
      </PageContainer>
    </>
  )
}

export default PropertyForm
