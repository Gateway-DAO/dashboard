import WalletHero from '../../features/wallet/hero/hero';
import { Stack } from '@mui/material';
import { pageWithBackgroundColor } from '@/components/page-with-full-background';

export default function UserWallet() {
  return (
    <Stack {...pageWithBackgroundColor}>
      <WalletHero />;
    </Stack>
  );
}
