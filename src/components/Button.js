import styled from '@xstyled/styled-components'

const Button = styled.buttonBox`
  border-radius: 3;
  border: 2;
  border-color: primary;
  color: white;
  margin: 0 3;
  padding: 2 4;
  cursor: pointer;
  font-size: 16;
  background-color: primary;

  &:hover {
    background-color: primary900;
  }

  &:focus {
    outline: none;
    box-shadow: glow;
  }
`

export { Button }
