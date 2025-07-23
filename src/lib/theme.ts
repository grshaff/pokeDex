import { createTheme } from '@mui/material';
import '@fontsource/poppins';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: 'white',
    },
  },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
    // optionally override component defaults
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: 'Poppins, sans-serif',
          },
        },
      },
    },
  });
  
  export default theme;