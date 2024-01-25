import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Stack } from '@mui/material';

import AuthComponent from '../auth-component/auth-component';
import Logo from '../logo/logo';

export default function MobileHeader() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        display: {
          xs: 'flex',
          lg: 'none',
        },
        pt: 5,
        pb: 2,
        px: CONTAINER_PX,
      }}
    >
      <Logo />
      <AuthComponent
        id="mobile-menu-profile-button"
        controlId="mobile-menu-profile-menu"
      />
    </Stack>
  );
}
