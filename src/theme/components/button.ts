import { Theme } from '@mui/material/styles';

export const MuiButton: Extract<Theme['components'], object>['MuiButton'] = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      textTransform: 'unset',
      borderRadius: theme.spacing(5),
      fontWeight: 'bold',
    }),
    outlinedError: ({ theme }) => ({
      color: theme.palette.error.dark,
    }),
    outlinedInfo: ({ theme }) => ({
      color: theme.palette.info.dark,
    }),
    outlinedWarning: ({ theme }) => ({
      color: theme.palette.warning.dark,
    }),
    outlinedSecondary: ({ theme }) => ({
      color: theme.palette.secondary.dark,
    }),
    outlinedSuccess: ({ theme }) => ({
      color: theme.palette.success.dark,
    }),
  },
};
