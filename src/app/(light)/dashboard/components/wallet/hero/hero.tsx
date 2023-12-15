'use client';

import { useEffect, useState } from 'react';

import useMyWallet from '@/hooks/use-my-wallet';
import { sandboxWalletAlert } from '@/locale/en/alert-messages';
import { common } from '@/locale/en/common';
import { wallet } from '@/locale/en/wallet';
import { CONTAINER_PX } from '@/theme/config/style-tokens';
import { currentEnv } from '@/utils/env';

import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';

import { useWalletStore } from '../../../stores/wallet.store';
import WalletBalance from './wallet-balance';
import WalletStatement from './wallet-statement';

export default function WalletHero(): JSX.Element {
  const { showValues: valueVisible, toggleShowValue: toggleVisible } =
    useWalletStore((state) => state);
  const [showAlert, toggleAlert] = useState(false);
  const storageKey = 'testnet-wallet-disclaimer';
  const testnet = currentEnv === 'testnet' || 'development';
  const { isLoading, myWallet } = useMyWallet();

  let hasSeenTestnetDisclaimer: string | null;

  useEffect(() => {
    hasSeenTestnetDisclaimer = localStorage.getItem(storageKey) || null;
  }, []);

  useEffect(() => {
    if (!hasSeenTestnetDisclaimer || hasSeenTestnetDisclaimer !== 'closed') {
      toggleAlert(true);
    }
  }, []);

  return (
    <Stack
      bgcolor="primary.light"
      width="100%"
      sx={{
        px: CONTAINER_PX,
        pt: {
          xs: 2,
          lg: 5,
        },
        pb: {
          xs: 10,
          lg: 4,
        },
      }}
    >
      {testnet && showAlert && (
        <Alert
          sx={{
            mb: 4,
            mt: 4,
          }}
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                localStorage.setItem(storageKey, 'closed');
                toggleAlert(false);
              }}
            >
              {common.actions.close}
            </Button>
          }
        >
          <AlertTitle sx={{ marginBottom: 0 }}>
            {sandboxWalletAlert.title}
          </AlertTitle>
        </Alert>
      )}
      <Typography variant="h3">{wallet.page.title}</Typography>
      <WalletBalance
        setVisible={toggleVisible}
        valueVisible={valueVisible}
        value={myWallet?.balance as number}
        isLoading={isLoading}
      />
      <WalletStatement
        isLoading={isLoading}
        myWallet={myWallet}
        showValues={valueVisible}
      />
    </Stack>
  );
}
