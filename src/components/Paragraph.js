import styled, { css } from '@xstyled/styled-components'
import { up } from '@xstyled/system'

const Paragraph = styled.pBox`
  color: paragraph;
  font-size: 16;
  font-weight: light;
  margin: 6 0;

  ${up(
    'md',
    css`
      font-size: 18;
      max-width: 430;
      margin: 20 0;
    `,
  )}
`

export { Paragraph }
