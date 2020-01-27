import React from 'react'
import styled from '@xstyled/styled-components'

const InnerAlert = styled.box`
  background-color: green;
  text-align: center;
  position: fixed;
  top: 60;
  z-index: 150;
`

export const Alert = React.forwardRef((props, ref) => {
  return <InnerAlert ref={ref} role="alert" {...props} />
})
