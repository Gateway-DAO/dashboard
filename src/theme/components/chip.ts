import { Theme } from '@mui/material/styles';

export const MuiChip: Extract<Theme['components'], object>['MuiChip'] = {
  styleOverrides: {
    root: {
      fontFamily: 'inherit',
      borderRadius: 40,
    },
    colorError: ({ theme, ownerState }) =>
      ownerState.variant === 'filled'
        ? {
            color: theme.palette.text.secondary,
          }
        : {
            color: theme.palette.error.dark,
          },
    colorInfo: ({ theme, ownerState }) =>
      ownerState.variant === 'filled'
        ? {
            color: theme.palette.text.secondary,
          }
        : {
            color: theme.palette.info.dark,
          },
    colorSuccess: ({ theme, ownerState }) =>
      ownerState.variant === 'filled'
        ? {
            color: theme.palette.text.secondary,
          }
        : {
            color: theme.palette.success.dark,
          },
    colorWarning: ({ theme, ownerState }) =>
      ownerState.variant === 'filled'
        ? {
            color: theme.palette.text.secondary,
          }
        : {
            color: theme.palette.warning.dark,
          },
  },
};
