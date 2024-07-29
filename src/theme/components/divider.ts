import { Theme } from '@mui/material/styles';

export const MuiDivider: Extract<Theme['components'], object>['MuiDivider'] = {
  variants: [
    {
      props: { variant: 'light' },
      style: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
  ],
};
