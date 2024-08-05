import { Theme } from '@mui/material/styles';

export const MuiContainer: Extract<
  Theme['components'],
  object
>['MuiContainer'] = {
  defaultProps: {
    maxWidth: 'xl',
  },
  styleOverrides: {
    root: ({ theme }) =>
      theme.unstable_sx({
        px: {
          xs: 3,
          md: 6,
        },
      }),
  },
};
