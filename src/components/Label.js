import React from 'react'
import styled from '@xstyled/styled-components'

const InnerLabel = styled.labelBox`
  color: ${p => p.color};
  margin-bottom: 2;
  font-weight: 600;
`

const Required = styled.span`
  color: danger;
`

export function Label({ children, htmlFor, required, invalid, ...props }) {
  return (
    <InnerLabel
      htmlFor={htmlFor}
      color={invalid ? 'danger' : 'black'}
      {...props}
    >
      {children}
      {required && <Required>*</Required>}
    </InnerLabel>
  )
}
