import '../styles/globals.css';

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line import/no-unresolved
import type { AppProps } from 'next/app';
import { GLOBAL_MUI_THEME } from '../styles/global.theme';
import { LocalizationProvider } from '@mui/x-date-pickers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={GLOBAL_MUI_THEME}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
