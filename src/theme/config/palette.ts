import { PaletteOptions } from '@mui/material/styles';

import { brandColors } from './brand';
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: brandColors.primary,
    light: brandColors.primaryLight,
    50: brandColors.primaryLighter,
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
  white: {
    main: '#fff',
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
  white: {
    main: '#fff',
  },
  background: {
    default: '#212121',
  },
};
