import React from 'react'
import styled from '@xstyled/styled-components'
import { FormFieldLabel } from '@smooth-ui/core-sc'

const DangerSpan = styled.span`
  color: danger;
`

export default function Label({
  children,
  htmlFor,
  required,
  invalid,
  ...props
}) {
  return (
    <FormFieldLabel name={htmlFor} color={invalid ? 'red' : 'black'} {...props}>
      {children}
      {required && <DangerSpan>*</DangerSpan>}
    </FormFieldLabel>
    // </InnerLabel>
  )
}
