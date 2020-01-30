import React from 'react'
import { Form, FormErrorAlert, SubmitButton } from '../components/Form'
import { InputField } from '../components/Field'
import { Text } from '../components/Text'
import { Box } from '@xstyled/styled-components'
import {
  parseInt,
  parseDecimalNumber,
  formatDecimalNumber,
} from '../utils/parsers'

function PropertyForm({ property, onSubmit, submitLabel, submittingLabel }) {
  return (
    <Form onSubmit={onSubmit} initialValues={property}>
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
          <SubmitButton submittingLabel={submittingLabel} m={0}>
            {submitLabel}
          </SubmitButton>
        </Box>
      </Box>

      <Box row mt={5}>
        <Box col={{ xs: 1, md: 1 / 2 }} mr={6}>
          <Text variant="h3">Description</Text>

          <InputField
            type="number"
            label="Nombre de salles de bain"
            name="bathroomsCount"
            parse={parseInt}
            horizontal
          />
          <InputField
            type="number"
            label="Nombre de chambres"
            name="bedroomsCount"
            parse={parseInt}
            horizontal
          />
          <InputField
            type="number"
            label="Étage"
            name="floor"
            parse={parseInt}
            horizontal
          />
          <InputField
            type="number"
            label="Nombre de place de parkings"
            name="parking"
            parse={parseInt}
            horizontal
          />
          <InputField
            type="number"
            label="Surface (m2)"
            name="surface"
            parse={parseDecimalNumber}
            format={formatDecimalNumber}
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
      <FormErrorAlert />
    </Form>
  )
}

export default PropertyForm
