import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp
