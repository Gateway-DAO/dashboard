import { PropsWithChildren } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { GlobalStyles } from './global-styles';
import DevTheme from './dev';
import { theme } from './theme';

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <MUIThemeProvider theme={theme}>
        <GlobalStyles />
        <CssBaseline />
        <DevTheme />
        {children}
      </MUIThemeProvider>
    </AppRouterCacheProvider>
  );
}
