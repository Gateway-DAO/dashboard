'use client';
import { PropsWithChildren, ReactNode } from 'react';

import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Stack } from '@mui/system';

import AuthComponent from '../auth-component/auth-component';
import Menu from './menu';

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
        <Stack
          sx={{
            '@media screen and (max-height: 900px) and (min-width: 1200px)': {
              overflowY: 'auto',
              overflowX: 'hidden',
              my: 2,
              '&::-webkit-scrollbar': {
                width: 5,
              },
              '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 5px #ddd',
                borderRadius: 10,
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: 10,
                backgroundColor: '#dcdcdc',
              },
            },
          }}
        >
          <Menu
            menuItems={menuItems}
            sx={{
              mt: 5,
              mx: -2.5,
              display: { xs: 'none', lg: 'block' },
              flexGrow: 1,
              '@media screen and (max-height: 900px) and (min-width: 1200px)': {
                mt: 2,
              },
            }}
          />
          {secondMenuItems && (
            <Menu
              menuItems={secondMenuItems}
              sx={{
                mt: 5,
                mx: -2.5,
                display: { xs: 'none', lg: 'block' },
                flexGrow: 1,
                '@media screen and (max-height: 900px) and (min-width: 700px)':
                  {
                    mt: 2,
                  },
              }}
            />
          )}
        </Stack>
        <AuthComponent id="profile-button" controlId="profile-menu" />
      </Stack>
    </Stack>
  );
}
