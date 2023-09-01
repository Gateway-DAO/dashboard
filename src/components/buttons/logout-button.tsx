'use client';

import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';

export default function LogoutButton() {
  return (
    <IconButton
      onClick={async () => {
        console.log('logout');
      }}
      sx={{
        position: 'absolute',
        top: { xs: 10, md: 38 },
        right: { xs: 20, md: 48 },
        zIndex: 1,
        backgroundColor: 'primary.main',
      }}
    >
      <LogoutIcon />
    </IconButton>
  );
}
