import React from 'react'
import ThemeProvider from './containers/Theme'
import Home from './containers/Home'
import PropertyForm from './containers/PropertyForm'
import ApolloProvider from './components/Apollo'
import Header from './components/Header'
import { GlobalStyle } from './components/GlobalStyle'
import { Helmet } from 'react-helmet'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import * as routePaths from './routePaths'
import { PageContainer } from './components/PageContainer'

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
            <Header />
            <PageContainer>
              <Switch>
                <Route exact path={routePaths.home()}>
                  <Home />
                </Route>
                <Route path={routePaths.addProperty()}>
                  <PropertyForm />
                </Route>
              </Switch>
            </PageContainer>
          </>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
