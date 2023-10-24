'use client';
import { PropsWithChildren, ReactNode } from 'react';

import { Stack } from '@mui/system';

import Menu from './menu';

type Props = {
  menuItems: ReactNode;
  secondMenuItems?: ReactNode;
};

export default function MenuContainer({
  menuItems,
  secondMenuItems,
}: PropsWithChildren<Props>) {
  return (
    <Stack
      sx={{
        flexGrow: 1,
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
            '@media screen and (max-height: 900px) and (min-width: 700px)': {
              mt: 2,
            },
          }}
        />
      )}
    </Stack>
  );
}
