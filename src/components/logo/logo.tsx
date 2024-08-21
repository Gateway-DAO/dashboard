import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { Stack, Typography } from '@mui/material';

import GatewaySquaredThemedIcon from '../icons/gateway-squared-themed';

type Props = {
  theme?: 'light' | 'dark';
  href: string;
};

export default function Logo({
  theme = 'light',
  children,
  href,
}: PropsWithChildren<Props>) {
  return (
    <Stack
      component={Link}
      href={href}
      sx={{
        gap: 1,
        alignItems: 'center',
        flexDirection: 'row',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      <GatewaySquaredThemedIcon
        sx={{
          width: 40,
          height: 40,
        }}
        theme={theme}
      />
      <Typography
        component="h1"
        ml={1}
        color="inherit"
        fontWeight="bold"
        sx={{
          transition: 'color 0.25s',
          textDecoration: 'none',
        }}
      >
        Gateway
      </Typography>
      {children}
    </Stack>
  );
}
