import { Theme } from '@mui/material/styles';

export const MuiButton: Extract<Theme['components'], object>['MuiButton'] = {
  styleOverrides: {
    root: {
      textTransform: 'unset',
    },
  },
};
