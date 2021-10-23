import { createTheme } from '@material-ui/core/styles';
import { red, grey } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#515fa8',
    },
    secondary: {
      main: '#f44336',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    grey: {
      main: grey
    }
  },
});

export default theme;
