import { PropsWithChildren } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import DevTheme from './dev';
import { GlobalStyles } from './global-styles';
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
