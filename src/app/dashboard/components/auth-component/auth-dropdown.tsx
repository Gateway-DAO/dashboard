'use client';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

import routes from '@/constants/routes';

import { LogoutOutlined, SettingsOutlined } from '@mui/icons-material';
import { Divider, ListItemIcon, ListItemText, MenuItem } from '@mui/material';

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
      <MenuItem
        component={Link}
        href={routes.dashboard.settings}
        onClick={onClose}
      >
        <ListItemIcon>
          <SettingsOutlined />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>
      <MenuItem onClick={onSignOut}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText>Disconnect</ListItemText>
      </MenuItem>
    </>
  );
}
