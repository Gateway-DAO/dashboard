import { Stack } from '@mui/system';

import Logo from './logo';
import Menu, { MenuItem } from './menu';

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
