'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';

import { auth } from '@/locale/en/auth';

import { LogoutOutlined } from '@mui/icons-material';
import { Divider, ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import AuthDropdownCurrent from './auth-dropdown-current';
import AuthDropdownProfilesList from './auth-dropdown-profiles-list';

type Props = {
  onClose: () => void;
};

export default function AuthDropdown({ onClose }: Props) {
  const router = useRouter();
  const onSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <AuthDropdownCurrent onClose={onClose} />
      <Divider />
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
