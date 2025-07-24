import { createTheme } from '@mui/material';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#42494D',
      light: '#7B8082',
      
    },
    secondary:{
      main: '#E6AB09',
      light: '#ECEDED',
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