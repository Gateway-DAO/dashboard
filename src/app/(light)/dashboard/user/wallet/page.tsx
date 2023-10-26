import { Metadata } from 'next';

import { pageWithBackgroundColor } from '@/components/page-with-full-background';

import { Stack } from '@mui/material';

import WalletHero from '../../components/wallet/hero/hero';
import { TransactionModal } from '../../components/wallet/transaction/components/transaction-modal';

export const metadata: Metadata = {
  title: 'User Wallet - Gateway Network',
};

export default function UserWallet() {
  return (
    <Stack
      sx={{
        ...pageWithBackgroundColor,
      }}
    >
      <WalletHero balance="" />
      <TransactionModal />
    </Stack>
  );
}
