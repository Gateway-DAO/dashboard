'use client';
import { createTheme } from '@mui/material/styles';

import * as components from './components';
import { lightPalette, darkPalette } from './config/palette';
import typography from './config/typography';

export const theme = createTheme({
  palette: lightPalette,
  typography,
  shape: {
    borderRadius: 16,
  },
  components: {
    ...components,
  },
});

export type GatewayTheme = typeof theme;
