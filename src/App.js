import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import * as routePaths from './routePaths'

import ApolloProvider from './components/Apollo'
import AuthProvider from './components/Auth'
import GlobalStyle from './components/GlobalStyle'
import Home from './containers/Home'

import Login from './routes/Login'
import InvestmentAdd from './routes/InvestmentAdd'
import PropertyAdd from './routes/PropertyAdd'
import PropertyEdit from './routes/PropertyEdit'
import Register from './routes/Register'
import ThemeProvider from './components/Theme'

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider>
        <AuthProvider>
          <ThemeProvider>
            <>
              <Helmet defaultTitle="Immo" titleTemplate="Immo | %s"></Helmet>
              <GlobalStyle />
              <Switch>
                <Route exact path={routePaths.getHomePath()}>
                  <Home />
                </Route>
                <Route path={routePaths.getLogoutPath()}>
                  <Home logout />
                </Route>

                {/* Investment CRUD */}
                <Route path={routePaths.getNewInvestmentPath()}>
                  <InvestmentAdd />
                </Route>

                {/* Property CRUD */}
                <Route path={routePaths.getNewPropertyPath()}>
                  <PropertyAdd />
                </Route>
                <Route path={routePaths.getEditPropertyPath()}>
                  <PropertyEdit />
                </Route>

                {/* User CRUD */}
                <Route path={routePaths.getRegisterPath()}>
                  <Register />
                </Route>
                <Route path={routePaths.getLoginPath()}>
                  <Login />
                </Route>
              </Switch>
            </>
          </ThemeProvider>
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
