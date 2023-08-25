"use client";
import { PropsWithChildren, ReactNode } from 'react';

import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Stack } from '@mui/system';

import DesktopAuthComponent from '../auth-component/desktop-auth-component';
import MobileAuthComponent from '../auth-component/mobile-auth-component';
import Menu from './menu';

type Props = {
  menuItems: ReactNode;
};

export default function Sidebar({ menuItems, children }: PropsWithChildren<Props>) {
  return (
    <Stack
      component={'aside'}
      sx={(theme) => ({
        boxSizing: 'border-box',
        pt: 5,
        pb: 2,
        px: CONTAINER_PX,
        [theme.breakpoints.down('lg')]: {
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        },
        [theme.breakpoints.up('lg')]: {
          borderRight: '1px solid',
          borderColor: 'divider',
          maxWidth: { xs: '100%', md: '300px' },
          width: '100%',
          px: 2.5,
        }
      })}
    >
      {children}
      <Menu menuItems={menuItems} sx={{ mt: 5, mx: -2.5, display: { xs: 'none', lg: 'block' } }} />
      <DesktopAuthComponent sx={{ display: { xs: 'none', lg: 'flex' } }} />
      <MobileAuthComponent sx={{ display: { xs: 'inline-flex', lg: 'none' } }} />

    </Stack>
  );
}
