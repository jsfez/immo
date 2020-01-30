import React from 'react'
import { Form, FormErrorAlert, SubmitButton } from '../components/Form'
import { InputField } from '../components/Field'
import { Box } from '@xstyled/styled-components'

function UserForm({ user, onSubmit, submitLabel, submittingLabel, action }) {
  const isRegisterForm = action === 'register'

  return (
    <Form onSubmit={onSubmit} initialValues={user}>
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
          {isRegisterForm && (
            <InputField
              type="text"
              label="Nom"
              name="name"
              required
              horizontal
            />
          )}
        </Box>
        <Box col></Box>
        <Box>
          <SubmitButton submittingLabel={submittingLabel} mx={0}>
            {submitLabel}
          </SubmitButton>
        </Box>
      </Box>
      <FormErrorAlert />
    </Form>
  )
}

export default UserForm
