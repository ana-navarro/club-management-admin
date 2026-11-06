import { createTheme, type Theme } from '@mui/material/styles'

export type ColorMode = 'light' | 'dark'

const palette = {
  navy: '#071B2B',
  teal: '#167D8D',
  aqua: '#B9E4E8',
  gray: '#EEEEEE',
  white: '#FFFFFF',
}

export function createAppTheme(mode: ColorMode): Theme {
  const isDark = mode === 'dark'
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? palette.aqua : palette.teal,
        contrastText: isDark ? palette.navy : palette.white,
      },
      background: {
        default: isDark ? palette.navy : palette.gray,
        paper: isDark ? palette.navy : palette.white,
      },
      text: { primary: isDark ? palette.gray : palette.navy },
    },
    components: {
      MuiLink: {
        defaultProps: { underline: 'always' },
        styleOverrides: { root: { color: isDark ? palette.aqua : palette.navy } },
      },
    },
  })
}
