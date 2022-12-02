import { createTheme } from '@mui/material'
import { Theme } from '@mui/material/styles'

import palette from './palette'
import typography from './typography'

import '@mui/styles'

const theme: Theme = createTheme({
  typography,
  palette,
})

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

export default theme
