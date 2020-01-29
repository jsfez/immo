import React from 'react'
import { transparentize } from 'polished'
import {
  ThemeProvider as BaseThemeProvider,
  css,
  rpxTransformers,
  up,
  th,
} from '@xstyled/styled-components'

const theme = {
  colors: {
    primary: '#28afb0',
    danger: '#E74C3C',
    success: '#2FCC71',
    whiteSmoke: '#F5F5F5',
    blue: '#2A7ED2',
    black: '#172A3A',
    primary700: p => transparentize(0.3, p.theme.colors.primary),
    primary900: p => transparentize(0.1, p.theme.colors.primary),
    paragraph: p => transparentize(0.7, p.theme.colors.black),
  },
  shadows: {
    glow: p =>
      `0 0 0 ${th.px(2)(p)} ${transparentize(0.7, th.color('primary')(p))}`,
    soft: p => `0 ${th.px(2)(p)} ${th.px(6)(p)} 0 rgba(0, 0, 0, 0.1)`,
    dialog: p =>
      `${th.px(2)(p)} ${th.px(2)(p)} ${th.px(4)(p)} 0 rgba(0, 0, 0, 0.25)`,
  },
  transitions: {
    base: '.2s ease-in-out',
  },
  sizes: {
    'container-base': 1200,
  },
  radii: {
    base: 4,
    xs: 2,
  },
  texts: {
    h1: {
      defaultAs: 'h1',
      style: css`
        font-size: 24;
        padding-top: 10;
        margin-bottom: 2;
        color: red;
      `,
    },
    h2: {
      defaultAs: 'h2',
      style: css`
        font-size: 22;
        padding-top: 10;
        margin-bottom: 2;
        color: blue;
      `,
    },
    h3: {
      defaultAs: 'h3',
      style: css`
        font-size: 20;
        padding-top: 10;
        margin-bottom: 2;
        color: green;
      `,
    },
    paragraph: {
      defaultAs: 'p',
      style: css`
        font-family: serif;
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
      `,
    },
  },
  transformers: {
    ...rpxTransformers,
  },
}

export default function ThemeProvider({ children }) {
  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
}
