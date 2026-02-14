import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#6750A4',
        },
        secondary: {
          main: '#625B71',
        },
        background: {
          default: '#FFFBFE',
          paper: '#FFFBFE',
        },
        error: {
          main: '#B3261E',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#D0BCFF',
        },
        secondary: {
          main: '#CCC2DC',
        },
        background: {
          default: '#1C1B1F',
          paper: '#1C1B1F',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 400,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 400,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const elevation = ownerState.elevation || 0
          const opacity = elevation === 1 ? '5%' :
                          elevation === 2 ? '8%' :
                          elevation === 3 ? '11%' :
                          elevation === 4 ? '12%' :
                          elevation === 5 ? '14%' : '0%'
          
          return {
            backgroundImage: 'none',
            borderRadius: 16,
            ...(elevation > 0 && {
              backgroundColor: `color-mix(in srgb, ${theme.vars.palette.background.paper}, ${theme.vars.palette.primary.main} ${opacity})`,
            }),
          }
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 28,
          padding: 8,
          elevation: 3,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'var(--mui-palette-divider)',
        },
      },
    },
  },
})
