'use client';

import { useEffect, useState } from 'react';

import { pageWithBackgroundColor } from '@/components/page-with-full-background';
import { CONTAINER_PX } from '@/theme/config/style-tokens';
import { currentEnv } from '@/utils/env';

import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';

import WalletBalance from './wallet-balance';

export default function WalletHero(): JSX.Element {
  const [showAlert, toggleAlert] = useState(false);
  const storageKey = 'testnet-wallet-disclaimer';
  const testnet = currentEnv() === 'testnet' || 'development';

  const hasSeenTestnetDisclaimer: string | null =
    localStorage.getItem(storageKey) || null;

  useEffect(() => {
    if (!hasSeenTestnetDisclaimer || hasSeenTestnetDisclaimer !== 'closed') {
      toggleAlert(true);
    }
  }, []);
  return (
    <Stack
      bgcolor="primary.light"
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
              Close
            </Button>
          }
        >
          <AlertTitle sx={{ marginBottom: 0 }}>
            Be aware the money on Sandbox is fake and worthless
          </AlertTitle>
        </Alert>
      )}
      <Typography variant="h3">Wallet</Typography>
      <WalletBalance value="$455.34" />
    </Stack>
  );
}
