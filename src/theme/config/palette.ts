import { PaletteOptions } from '@mui/material/styles';

import { brandColors } from './brand';

export const palette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: brandColors.primary,
    light: brandColors.primaryLight,
    50: brandColors.primaryLighter,
    '100': '#F0E6FC',
    '200': '#F5B5FF',
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
