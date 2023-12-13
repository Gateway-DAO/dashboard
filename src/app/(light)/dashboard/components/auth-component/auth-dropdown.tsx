'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';

import { featureToggle } from '@/environment/environment';
import { auth } from '@/locale/en/auth';

import { LogoutOutlined } from '@mui/icons-material';
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@mui/material';

import WalletWidget from '../wallet/wallet-widget/wallet-widget';
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
        <Box sx={{ display: { xs: 'block', lg: 'none' }, px: 2, pt: 1 }}>
          <WalletWidget id="wallet-button" />
        </Box>
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
