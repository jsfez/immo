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

const SIGNUP_MUTATION = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
      }
    }
  }
`

async function confirm(history, data) {
  const token = data.signup.token
  localStorage.setItem(AUTH_TOKEN, token)
  history.push(`/`)
}

async function handleSubmit(signup, values) {
  try {
    return await signup({ variables: { ...values } })
  } catch (error) {
    return { [FORM_ERROR]: DEFAULT_FORM_ERROR_MESSAGE }
  }
}

function PropertyForm() {
  const history = useHistory()
  const [signup] = useMutation(SIGNUP_MUTATION, {
    onCompleted: data => confirm(history, data),
  })

  return (
    <>
      <Header>Inscription</Header>
      <PageContainer>
        <Text variant="h1">Inscription</Text>

        <Form onSubmit={values => handleSubmit(signup, values)}>
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
              <InputField
                type="text"
                label="Nom"
                name="name"
                required
                horizontal
              />
            </Box>
            <Box col></Box>
            <Box>
              <SubmitButton mx={0}>S'inscrire</SubmitButton>
            </Box>
          </Box>
          <FormErrorAlert />
          <FormSuccessAlert>Compte créé</FormSuccessAlert>
        </Form>
      </PageContainer>
    </>
  )
}

export default PropertyForm
