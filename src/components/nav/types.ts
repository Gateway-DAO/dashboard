import GatewaySquaredThemedIcon from '@/components/icons/gateway-squared-themed';

import { ButtonOwnProps, ButtonProps } from '@mui/material';
import { IconButtonOwnProps } from '@mui/material';

export type NavColor = 'white' | 'black';

export const translateColor: Record<NavColor, string> = {
  white: '#fff',
  black: '#000',
};

export const buttonTranslateColor: Record<
  NavColor,
  IconButtonOwnProps['color'] | ButtonOwnProps['color']
> = {
  white: 'white',
  black: 'primary',
};

export const logoTranslateColor: Record<
  NavColor,
  NonNullable<Parameters<typeof GatewaySquaredThemedIcon>[0]['theme']>
> = {
  white: 'dark',
  black: 'light',
};

export type NavLink = {
  label: string;
  href?: string;
  onClick?: () => void;
  target?: string;
  externalIcon?: boolean;
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  hideOnMobile?: boolean;
};
