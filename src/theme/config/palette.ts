import { PaletteOptions } from '@mui/material';

import { brandColors } from './brand';

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: brandColors.primary,
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

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: brandColors.primary,
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
    default: '#212121',
  },
};
