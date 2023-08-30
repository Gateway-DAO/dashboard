'use client';

import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Button } from '@mui/material';

export default function LogoutButton() {
  return (
    <Button
      onClick={async () => {
        console.log('logout');
      }}
      sx={{
        position: 'absolute',
        top: { xs: 10, md: 38 },
        right: { xs: 20, md: 48 },
        zIndex: 1,
      }}
    >
      <Avatar
        component="a"
        sx={{
          width: 40,
          height: 40,
          alignSelf: 'center',
          cursor: 'pointer',
          backgroundColor: 'primary.main',
        }}
      >
        <LogoutIcon />
      </Avatar>
    </Button>
  );
}
