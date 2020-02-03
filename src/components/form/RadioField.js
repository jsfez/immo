import React from 'react'
import { Radio, FormCheck, FormCheckLabel, Box } from '@smooth-ui/core-sc'
import { useField } from 'react-final-form'
import { mustBeFilled } from './utils/validators'

export default function RadioField({
  name,
  value,
  required,
  children,
  ...props
}) {
  const field = useField(name, {
    type: 'radio',
    validate: required ? mustBeFilled : undefined,
  })

  const error = field.meta.touched ? field.meta.error : null
  const isInvalid = field.meta.touched ? field.meta.invalid : null

  return (
    <FormCheck>
      <Radio
        name={name}
        value={`${name}-${value}`}
        aria-invalid={isInvalid}
        {...field.input}
        {...props}
      />
      {children ? (
        <FormCheckLabel name={name}>{children}</FormCheckLabel>
      ) : null}

      {error && <Box color="danger">{error}</Box>}
    </FormCheck>
  )
}
