'use client';
import { createTheme } from '@mui/material/styles';

import { palette } from './config/palette';
import typography from './config/typography';

export const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 8,
  }
});

export type GatewayTheme = typeof theme;
