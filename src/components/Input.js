import styled from '@xstyled/styled-components'

const Input = styled.inputBox`
  border: 1;
  color: black;
  padding: 1;
  border-radius: base;

  &:focus {
    outline: none;
  }

  &[aria-invalid='true'] {
    color: danger;
    border-color: danger;
  }
`

const ErrorHint = styled.box`
  display: flex;
  margin-top: s1;
  color: danger;
`

export { Input, ErrorHint }
