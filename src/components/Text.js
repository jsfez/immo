import React from 'react'
import styled, { Box, useTheme } from '@xstyled/styled-components'

const ForwardedBox = ({ forwardedAs, ...props }) => (
  <Box as={forwardedAs} {...props} />
)

const StyledForwardedBox = styled(ForwardedBox)`
  padding: 0;
  margin: 0;
`

function Text({ variant = 'default', as, ...props }) {
  const textVariants = useTheme().texts
  const variantConf = textVariants[variant]

  return (
    <StyledForwardedBox
      forwardedAs={as || variantConf.defaultAs}
      css={variantConf.style}
      {...props}
    />
  )
}

export { Text }
