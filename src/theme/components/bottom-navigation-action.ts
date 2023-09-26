import { Theme } from '@mui/material/styles';

export const MuiBottomNavigationAction: Extract<
  Theme['components'],
  object
>['MuiBottomNavigationAction'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingTop: theme.spacing(1.75),
    }),
    label: {
      opacity: 0,
      '&.Mui-selected': {
        fontSize: '0.75rem',
      },
    },
  },
};
