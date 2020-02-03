import React from 'react'
import { Checkbox, FormCheck, FormCheckLabel } from '@smooth-ui/core-sc'
import { useField } from 'react-final-form'

export default function CheckboxField({
  name,
  children,
  id: idProp,
  ...props
}) {
  const id = idProp || name
  const field = useField(name, { type: 'checkbox' })

  return (
    <FormCheck>
      <Checkbox name={id} {...field.input} {...props} />
      {children ? <FormCheckLabel name={id}>{children}</FormCheckLabel> : null}
    </FormCheck>
  )
}
