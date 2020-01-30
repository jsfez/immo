import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import * as routePaths from './routePaths'
import ApolloProvider from './components/Apollo'
import GlobalStyle from './components/GlobalStyle'
import Home from './containers/Home'
import RegisterForm from './containers/RegisterForm'
import ThemeProvider from './components/Theme'
import PropertyAdd from './routes/PropertyAdd'
import PropertyEdit from './routes/PropertyEdit'

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
                <PropertyAdd />
              </Route>
              <Route path={routePaths.getEditPropertyPath()}>
                <PropertyEdit />
              </Route>
              <Route path={routePaths.getRegisterPath()}>
                <RegisterForm />
              </Route>
              <Route path={routePaths.getLoginPath()}>
                <RegisterForm loginForm />
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
