'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';

import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
import { auth } from '@/locale/en/auth';

import { AccountCircleOutlined, LogoutOutlined } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import AuthDropdownProfilesList from './auth-dropdown-profiles-list';

type Props = {
  onClose: () => void;
};

export default function AuthDropdown({ onClose }: Props) {
  const { isOrg, pathnameOrg } = useOrganization();

  const router = useRouter();
  const onSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <AuthDropdownProfilesList onClose={onClose} />
      <MenuItem
        component={Link}
        href={
          isOrg
            ? routes.dashboardOrgSettings(pathnameOrg)
            : routes.dashboardUserSettings
        }
        onClick={onClose}
      >
        <ListItemIcon>
          <AccountCircleOutlined />
        </ListItemIcon>
        <ListItemText>{auth.menu.gatewayId}</ListItemText>
      </MenuItem>
      <MenuItem onClick={onSignOut}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText>{auth.menu.disconnect}</ListItemText>
      </MenuItem>
    </>
  );
}
