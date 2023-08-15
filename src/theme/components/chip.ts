import { Theme } from '@mui/material/styles';

export const MuiChip: Extract<Theme['components'], object>['MuiChip'] = {
  styleOverrides: {
    root: {
      fontFamily: 'inherit',
      borderRadius: 40
    },
    colorError: ({theme}) => ({
      color:  theme.palette.text.secondary
    }),
    colorInfo: ({theme}) => ({
      color:  theme.palette.text.secondary
    }),
    colorSuccess: ({theme}) => ({
      color:  theme.palette.text.secondary
    }),
    colorWarning: ({theme}) => ({
      color:  theme.palette.text.secondary
    }),

  },
};
