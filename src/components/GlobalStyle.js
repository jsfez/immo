import { createGlobalStyle, th } from '@xstyled/styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    font-family: sans-serif;
    background-color: white;
    color: dark-blue;
    line-height: 1.4;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: ${th.color('primary700')};

    &::selection {
      background-color: ${th.color('primary700')};
    }
  }
  

  button {
    font-family: sans-serif;
  }
`

export default GlobalStyle
