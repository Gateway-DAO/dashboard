'use client';
import { signOut } from 'next-auth/react';

import routes from '@/constants/routes';
import { auth } from '@/locale/en/auth';

import { LogoutOutlined } from '@mui/icons-material';
import { Divider, ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import AuthDropdownCurrent from './auth-dropdown-current';
import AuthDropdownProfilesList from './auth-dropdown-profiles-list';

type Props = {
  onClose: () => void;
};

export default function AuthDropdown({ onClose }: Props) {
  const onSignOut = async () => {
    await signOut({
      callbackUrl: routes.home,
    });
  };

  return (
    <>
      <AuthDropdownCurrent onClose={onClose} />
      <Divider sx={{ my: 1 }} />
      <AuthDropdownProfilesList onClose={onClose} />
      <MenuItem onClick={onSignOut}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText>{auth.menu.disconnect}</ListItemText>
      </MenuItem>
    </>
  );
}
