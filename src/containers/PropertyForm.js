import React from 'react'
import {
  Form,
  FORM_ERROR,
  FormErrorAlert,
  SubmitButton,
} from '../components/Form'
import { Helmet } from 'react-helmet'
import { InputField } from '../components/Field'
import { Text } from '../components/Text'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Box } from '@xstyled/styled-components'

const CREATE_PROPERTY = gql`
  mutation createProperty($newProperty: PropertyCreate!) {
    createProperty(newProperty: $newProperty) {
      id
    }
  }
`

const errorMessages = {
  default: 'Oups une erreur est survenue.',
}

function PropertyForm() {
  const history = useHistory()
  const [createProperty] = useMutation(CREATE_PROPERTY)

  return (
    <>
      <Helmet>
        <title>Ajouter opportunité</title>
      </Helmet>

      <Form
        onSubmit={async values => {
          try {
            await createProperty({ variables: { newProperty: { ...values } } })
            history.push('/')
            return undefined
          } catch (error) {
            return { [FORM_ERROR]: errorMessages.default }
          }
        }}
      >
        <Text variant="h2" mb={2}>
          Nouvelle opportunité
        </Text>
        <Box row>
          <Box col={{ xs: 1, md: 1 / 2 }}>
            <InputField
              type="text"
              label="Nom de l'opportunité"
              name="name"
              required
              horizontal
            />
          </Box>
          <Box col></Box>
          <Box>
            <SubmitButton m={0}>Ajouter</SubmitButton>
          </Box>
        </Box>
        <FormErrorAlert />

        <Box row mt={5}>
          <Box col={{ xs: 1, md: 1 / 2 }} mr={6}>
            <Text variant="h3">Description</Text>

            <InputField
              type="number"
              label="Nombre de salles de bain"
              name="bathroomsCount"
              horizontal
            />
            <InputField
              type="number"
              label="Nombre de chambres"
              name="bedroomsCount"
              horizontal
            />
            <InputField type="number" label="Étage" name="floor" horizontal />
            <InputField
              type="number"
              label="Nombre de place de parkings"
              name="parking"
              horizontal
            />
            <InputField
              type="number"
              label="Surface (m2)"
              name="surface"
              horizontal
            />
            <InputField
              type="text"
              label="Points Positifs"
              name="advantages"
              horizontal
            />
            <InputField
              type="text"
              label="Points Négatifs"
              name="disadvantages"
              horizontal
            />
          </Box>

          <Box col>
            <Text variant="h3">Adresse</Text>
            <InputField type="text" label="Quartier" name="area" horizontal />
            <Box variant="paragraph" textAlign="center" my={2}>
              --- ET/OU ---
            </Box>
            <InputField type="text" label="Adresse" name="address" horizontal />
            <InputField type="text" label="Ville" name="City" horizontal />
            <InputField
              type="text"
              label="Code Postal"
              name="zipCode"
              horizontal
            />
          </Box>
        </Box>
      </Form>
    </>
  )
}

export default PropertyForm