import { Metadata } from 'next';

import { pageWithBackgroundColor } from '@/components/page-with-full-background';

import { Stack } from '@mui/material';

import WalletHero from '../../../components/wallet/hero/hero';

export const metadata: Metadata = {
  title: 'Organization Wallet - Gateway Network',
};

export default function WalletOrgPage() {
  return (
    <Stack
      sx={{
        ...pageWithBackgroundColor,
      }}
    >
      <WalletHero balance="" />
    </Stack>
  );
}
