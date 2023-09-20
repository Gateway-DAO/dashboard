import { Theme } from '@mui/material/styles';

export const MuiDialogActions: Extract<
  Theme['components'],
  object
>['MuiDialogActions'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingInline: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    }),
  },
};
