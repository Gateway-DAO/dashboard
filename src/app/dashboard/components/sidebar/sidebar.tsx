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
        borderRight: '1px solid',
        borderColor: 'divider',
        maxWidth: { xs: '100%', md: '300px' },
        width: '100%',
        pt: 5,
        pb: 2,
        px: 2,
        boxSizing: 'border-box',
      }}
    >
      <Logo />
      <Menu menuItems={menuItems} sx={{ mt: 5 }} />
    </Stack>
  );
}
