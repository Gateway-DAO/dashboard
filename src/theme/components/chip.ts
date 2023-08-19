import { Theme } from '@mui/material/styles';

export const MuiChip: Extract<Theme['components'], object>['MuiChip'] = {
  styleOverrides: {
    root: {
      fontFamily: 'inherit',
      borderRadius: 40
    },
    colorError: ({theme, ownerState}) => ownerState.variant ==="filled"  ? ({
      color: theme.palette.text.secondary
    }) : undefined,
    colorInfo: ({theme, ownerState}) => ownerState.variant ==="filled"  ? ({
      color: theme.palette.text.secondary
    }) : undefined,
    colorSuccess: ({theme, ownerState}) => ownerState.variant ==="filled"  ? ({
      color: theme.palette.text.secondary
    }) : ({
      color: theme.palette.success.dark
    }),
    colorWarning: ({theme, ownerState}) => ownerState.variant ==="filled"  ? ({
      color: theme.palette.text.secondary
    }) : undefined,
  },
};
