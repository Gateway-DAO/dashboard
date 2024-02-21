import { PropsWithChildren } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { GlobalStyles } from './global-styles';
import { lightTheme, darkTheme } from './theme';

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
type Props = {
  dark?: boolean;
  withGlobalStyles?: boolean;
};

export function ThemeProvider({
  dark = false,
  children,
  withGlobalStyles = true,
}: PropsWithChildren<Props>) {
  const theme = dark ? darkTheme : lightTheme;

  return (
    <AppRouterCacheProvider>
      <MUIThemeProvider theme={theme}>
        {withGlobalStyles && <GlobalStyles />}
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </AppRouterCacheProvider>
  );
}
