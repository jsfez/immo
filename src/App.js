import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import * as routePaths from './routePaths'
import ApolloProvider from './components/Apollo'
import GlobalStyle from './components/GlobalStyle'
import Home from './containers/Home'
import Login from './containers/Login'
import PropertyForm from './containers/PropertyForm'
import Register from './containers/Register'
import ThemeProvider from './components/Theme'

function App() {
  // const finalAppReturn = (
  //   <BrowserRouter> OK
  //     <ApolloInitializer> OK
  //       <AuthInitializer> NOK
  //         <ThemeProvider> OK
  //           <>
  //             <Helmet titleTemplate="%s | Le Monde Jeux" /> OK
  //             <Fonts /> NOK
  //             <GlobalStyle /> OK
  //             <Switch> </Switch> OK
  //           </>
  //         </ThemeProvider>
  //       </AuthInitializer>
  //     </ApolloInitializer>
  //   </BrowserRouter>
  // )
  return (
    <BrowserRouter>
      <ApolloProvider>
        <ThemeProvider>
          <>
            <Helmet defaultTitle="Immo" titleTemplate="Immo | %s"></Helmet>
            <GlobalStyle />
            <Switch>
              <Route exact path={routePaths.getHomePath()}>
                <Home />
              </Route>
              <Route path={routePaths.getNewPropertyPath()}>
                <PropertyForm />
              </Route>
              <Route path={routePaths.getRegisterPath()}>
                <Register />
              </Route>
              <Route path={routePaths.getLoginPath()}>
                <Login />
              </Route>
              <Route path={routePaths.getLogoutPath()}>
                <Home logout />
              </Route>
            </Switch>
          </>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
