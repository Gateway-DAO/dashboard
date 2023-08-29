import { Theme } from '@mui/material/styles';

export const MuiButton: Extract<Theme['components'], object>['MuiButton'] = {
  styleOverrides: {
    root: ({theme}) => ({
      textTransform: 'unset',
      borderRadius: theme.spacing(5),
    }),
  },
};
