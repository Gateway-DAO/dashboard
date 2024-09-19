'use client';
import { PropsWithChildren, ReactNode } from 'react';

import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Stack } from '@mui/system';

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
      component="aside"
      sx={{
        pt: 5,
        pb: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
        maxWidth: 300,
        width: '100%',
        px: 2.5,
        position: 'fixed',
        height: '100%',
        boxSizing: 'border-box',
        background: '#F6F4FA',
      }}
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
        <AuthComponent id="profile-button" controlId="profile-menu" />
      </Stack>
    </Stack>
  );
}
