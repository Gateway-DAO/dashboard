import { Theme } from '@mui/material/styles';

export const MuiContainer: Extract<
  Theme['components'],
  object
>['MuiContainer'] = {
  defaultProps: {
    maxWidth: 'xl',
  },
};
