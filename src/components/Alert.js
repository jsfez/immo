import React from 'react'
import styled, { css } from '@xstyled/styled-components'

const InnerAlert = styled.box`
  ${p =>
    p.variant === 'danger'
      ? css`
          background-color: danger;
        `
      : css`
          background-color: success;
        `}
  text-align: center;
  position: fixed;
  top: 30;
  right: 30;
  z-index: 150;
  padding: 1 3;
`

export const Alert = React.forwardRef((props, ref) => {
  return <InnerAlert ref={ref} role="alert" {...props} />
})
