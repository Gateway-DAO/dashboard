'use client';
import { createTheme } from '@mui/material/styles';

import * as components from './components';
import { palette } from './config/palette';
import typography from './config/typography';

export const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 16,
  },
  components: {
    ...components,
  },
});

export type GatewayTheme = typeof theme;
