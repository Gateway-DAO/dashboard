import { ReactNode } from 'react';

import { Stack } from '@mui/system';

import Logo from './logo';
import Menu from './menu';

export interface MenuItem {
  name: string;
  link: string;
  icon: ReactNode;
}

type Props = {
  menuItems: Array<MenuItem>;
};

export default function Sidebar({ menuItems }: Props) {
  return (
    <Stack
      component={'aside'}
      sx={{
        height: '100vh',
        borderRight: '1px solid',
        borderColor: 'divider',
        maxWidth: '300px',
        padding: '2rem',
      }}
    >
      <Logo />
      <Menu menuItems={menuItems} sx={{ mt: '40px' }} />
    </Stack>
  );
}
