import React from 'react'
import { useField } from 'react-final-form'
import { Input, ErrorHint } from './Input'
import { Label } from './Label'
import { Box } from '@xstyled/styled-components'

export function mustBeFilled(value) {
  const errorMessage = 'Ne peut être vide'

  if (typeof value === 'string') {
    value = value.trim()
  }

  if (value === '' || value === null || value === undefined) {
    return errorMessage
  }

  return undefined
}

export const composeValidators = (...validators) => (...args) =>
  validators.reduce(
    (error, validator) => error || validator(...args),
    undefined,
  )

export function InputField({
  label,
  name,
  required,
  validate,
  horizontal,
  id: idProp,
  ...props
}) {
  const id = idProp || name
  const validators = []
  if (validate) {
    validators.push(validate)
  }
  if (required) {
    validators.push(mustBeFilled)
  }
  const field = useField(name, {
    type: props.type,
    validate: validators.length ? composeValidators(...validators) : undefined,
  })
  const error = field.meta.touched ? field.meta.error : null
  const invalid = field.meta.touched ? field.meta.invalid : null

  return (
    <Box mt={2} {...(horizontal && { row: true })}>
      {label ? (
        <Label col htmlFor={id} required={required} invalid={invalid}>
          {label}
        </Label>
      ) : null}
      <Box col>
        <Input
          name={name}
          id={id}
          required={required}
          aria-invalid={invalid}
          {...props}
          {...field.input}
        />
        {error && <ErrorHint>{error}</ErrorHint>}
      </Box>
    </Box>
  )
}

export function DateField(props) {
  return <InputField type="date" {...props} />
}

export function CheckboxField(props) {
  return <InputField type="checkbox" {...props} />
}
