import type { Preview } from '@storybook/react';

import { lightTheme, darkTheme } from '../src/theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles: CssBaseline,
    // Uncomment for theme switching
    Provider: ThemeProvider,
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: 'light',
  }),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '#',
      },
    },
  },
};

export default preview;
