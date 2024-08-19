import { PaletteOptions } from '@mui/material';

import { brandColors } from './brand';
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: brandColors.primary,
    light: brandColors.primaryLight,
  },
  secondary: {
    main: brandColors.secondary,
  },
  error: {
    main: brandColors.error,
  },
  warning: {
    main: brandColors.warning,
  },
  info: {
    main: brandColors.info,
  },
  success: {
    main: brandColors.success,
  },
  background: {
    default: '#F6F4FA',
    paper: '#fff',
  },
};
