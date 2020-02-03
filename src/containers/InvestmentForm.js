import React, { useRef } from 'react'
import Form from '../components/form/Form'
import { FormField, CheckboxGroup, RadioGroup } from '@smooth-ui/core-sc'
import InputField from '../components/form/InputField'
import { SubmitButton } from '../components/form/SubmitButton'
import CheckboxField from '../components/form/CheckboxField'
import Label from '../components/form/Label'
import RadioField from '../components/form/RadioField'

function InvestmentForm({
  investment,
  onSubmit,
  submitLabel,
  submittingLabel,
}) {
  const formRef = useRef(null)

  return (
    <Form initialValues={investment} onSubmit={onSubmit} ref={formRef}>
      {renderProps => {
        console.log(renderProps.values)
        return (
          <>
            <InputField
              label="Nom de l'investissement"
              hint="Pour différentier les stratégies"
              name="investmentName"
              required
              horizontal
            />

            <FormField row>
              <Label col={1 / 3} py={0} id="brand">
                Brand
              </Label>
              <CheckboxGroup col aria-labelledby="brand">
                <CheckboxField name="Sony">Sony</CheckboxField>
                <CheckboxField name="Sega">Sega</CheckboxField>
              </CheckboxGroup>
            </FormField>

            <FormField row>
              <Label col={1 / 3} py={0} id="fruits">
                Fruits
              </Label>
              <RadioGroup col aria-labelledby="fruits">
                <RadioField name="fruit" value="apple">
                  Apple
                </RadioField>
                <RadioField name="fruit" value="orange">
                  Orange
                </RadioField>
              </RadioGroup>
            </FormField>

            <SubmitButton submittingLabel={submittingLabel}>
              {submitLabel}
            </SubmitButton>
          </>
        )
      }}
    </Form>
  )
}

export default InvestmentForm
