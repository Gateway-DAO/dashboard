import { Theme } from '@mui/material/styles';

export const MuiAlert: Extract<Theme['components'], object>['MuiAlert'] = {
  styleOverrides: {
    standardError: {
      backgroundColor: '#FDEDED',
    },
  },
};
