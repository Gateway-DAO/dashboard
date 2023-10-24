import { pageWithBackgroundColor } from '@/components/page-with-full-background';

import { Stack } from '@mui/material';

import WalletHero from '../../features/wallet/hero/hero';

export default function UserWallet() {
  return (
    <Stack sx={{ ...pageWithBackgroundColor }}>
      <WalletHero />
    </Stack>
  );
}
