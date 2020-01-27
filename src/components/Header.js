import React from 'react'
import styled, { Box } from '@xstyled/styled-components'
import { Button } from './Button'
import { Link } from 'react-router-dom'
import * as routePaths from '../routePaths'
import { PageContainer } from './PageContainer'
import Logo from '../images/logo-transparent.png'

const NavBar = styled.box`
  border-bottom: 1;
  border-color: black;
  height: 60;
  align-items: center;
`

const Brand = styled.box`
  margin: 0 50 0 0;
`

const SideBar = styled.box`
  justify-content: space-around;
`

export default function Header(props) {
  return (
    <NavBar {...props}>
      <PageContainer display="flex">
        <Brand as={Link} to={routePaths.home()}>
          <Box as="img" width="110" src={Logo} mt={-30} alt="Immo" />
        </Brand>
        <SideBar>
          <Link to={routePaths.home()}>
            <Button>Home</Button>
          </Link>
          <Link to={routePaths.addProperty()}>
            <Button>Create Property</Button>
          </Link>
        </SideBar>
      </PageContainer>
    </NavBar>
  )
}
