import React from 'react'
import styled, { Box } from '@xstyled/styled-components'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'
import * as routePaths from '../routePaths'
import PageContainer from '../components/PageContainer'
import Logo from '../images/logo-transparent.png'
import { AUTH_TOKEN } from '../constants'
import { Helmet } from 'react-helmet'

const NavBar = styled.box`
  border-bottom: 1;
  border-color: black;
  height: 60;
  align-items: center;
  margin-bottom: 20;
`

const Brand = styled.box`
  margin: 0 50 0 0;
`

const NavLink = ({ to, children, ...props }) => (
  <Link to={to}>
    <Button>{children}</Button>
  </Link>
)

export default function Header({ children, ...props }) {
  const authToken = localStorage.getItem(AUTH_TOKEN)
  return (
    <>
      {children && <Helmet>{children}</Helmet>}
      <NavBar {...props}>
        <PageContainer display="flex">
          <Brand as={Link} to={routePaths.getHomePath()}>
            <Box as="img" width="110" src={Logo} mt={-30} alt="Immo" />
          </Brand>

          <Box justifyContent="space-between" display="flex" flex={1}>
            <Box justifyContent="space-around" display="flex">
              <NavLink to={routePaths.getHomePath()}>Home</NavLink>
              <NavLink to={routePaths.getNewPropertyPath()}>
                Créer opportunité
              </NavLink>
            </Box>

            <Box justifyContent="space-around" display="flex" mr={-3}>
              {authToken ? (
                <NavLink to={routePaths.getLogoutPath()}>Déconnexion</NavLink>
              ) : (
                <>
                  <NavLink to={routePaths.getLoginPath()}>Connexion</NavLink>
                  <NavLink to={routePaths.getRegisterPath()}>
                    Créer un compte
                  </NavLink>
                </>
              )}
            </Box>
          </Box>
        </PageContainer>
      </NavBar>
    </>
  )
}
