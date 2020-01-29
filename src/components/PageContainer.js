import React from 'react'
import styled from '@xstyled/styled-components'

export const Container = styled.box`
  max-width: container-base;
  padding-left: 25;
  padding-right: 25;
  margin: 0 auto;
`

export default function PageContainer(props) {
  return <Container mt={{ xs: 25, md: 34 }} mb={60} {...props} />
}
