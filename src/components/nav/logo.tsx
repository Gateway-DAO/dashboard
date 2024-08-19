'use client';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import GatewaySquaredThemedIcon from '@/components/icons/gateway-squared-themed';

import { Stack, Typography } from '@mui/material';

import { useNavContext } from './context';
import { logoTranslateColor } from './types';

export default function NavLogo({ children }: PropsWithChildren) {
  const { color, isScrolled } = useNavContext();

  return (
    <Stack
      component={Link}
      href="/"
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
        theme={isScrolled ? 'light' : logoTranslateColor[color]}
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
