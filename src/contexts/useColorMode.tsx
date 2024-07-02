import { createContext, PropsWithChildren, useState, useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })
export function ColorModeProvider(props: PropsWithChildren) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState<'light' | 'dark'>(
    prefersDarkMode ? 'dark' : 'light',
  )

  const switchMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )
  const colorTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <ColorModeContext.Provider value={switchMode}>
      <CssBaseline />
      <ThemeProvider theme={colorTheme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
