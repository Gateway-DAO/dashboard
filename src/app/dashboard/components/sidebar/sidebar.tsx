import { ReactNode } from 'react';

import { Stack } from '@mui/system';

import Logo from './logo';
import Menu from './menu';

type Props = {
  menuItems: ReactNode;
};

export default function Sidebar({ menuItems }: Props) {
  return (
    <Stack
      component={'aside'}
      sx={{
        height: '100vh',
        borderRight: '1px solid',
        borderColor: 'divider',
        maxWidth: { xs: '100%', md: '300px' },
        padding: '2rem',
      }}
    >
      <Logo />
      <Menu menuItems={menuItems} sx={{ mt: '40px' }} />
    </Stack>
  );
}
