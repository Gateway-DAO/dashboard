'use client';
import { PropsWithChildren, ReactNode } from 'react';

import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Box } from '@mui/material';
import { Stack } from '@mui/system';

import WalletWidget from '../../features/wallet/wallet-widget/wallet-widget';
import AuthComponent from '../auth-component/auth-component';
import MenuContainer from './menu-container';

type Props = {
  menuItems: ReactNode;
  secondMenuItems?: ReactNode;
};

export default function Sidebar({
  menuItems,
  secondMenuItems,
  children,
}: PropsWithChildren<Props>) {
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
          maxWidth: 300,
          width: '100%',
          px: 2.5,
          position: 'fixed',
          height: '100%',
          boxSizing: 'border-box',
        },
      })}
    >
      {children}
      <Stack
        justifyContent="space-between"
        flexDirection="column"
        sx={{
          height: 'calc(100% - 40px)',
        }}
      >
        <MenuContainer
          menuItems={menuItems}
          secondMenuItems={secondMenuItems}
        />
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <WalletWidget id="wallet-button" />
        </Box>

        <AuthComponent id="profile-button" controlId="profile-menu" />
      </Stack>
    </Stack>
  );
}
