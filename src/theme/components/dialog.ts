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

export const MuiDialogTitle: Extract<
  Theme['components'],
  object
>['MuiDialogTitle'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.h5,
    }),
  },
};

export const MuiDialogContentText: Extract<
  Theme['components'],
  object
>['MuiDialogContentText'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.text.primary,
    }),
  },
};
