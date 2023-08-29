import { Theme } from '@mui/material/styles';

export const MuiTab: Extract<Theme['components'], object>['MuiTab'] = {
  styleOverrides: {
    root: {
      fontWeight: 'bold',
      textTransform: 'unset',
    },
  },
};
