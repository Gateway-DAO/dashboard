'use client';
import { createTheme } from '@mui/material/styles';

import typography from './config/typography';
import { palette } from './config/palette';

export const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 8,
  }
});

export type GatewayTheme = typeof theme;
