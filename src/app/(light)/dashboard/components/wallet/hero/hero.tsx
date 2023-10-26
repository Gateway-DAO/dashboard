'use client';

import { useEffect, useState } from 'react';

import { sandboxWalletAlert } from '@/locale/en/alert-messages';
import { wallet } from '@/locale/en/wallet';
import { CONTAINER_PX } from '@/theme/config/style-tokens';
import { currentEnv } from '@/utils/env';
import { useToggle } from '@react-hookz/web';

import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';

import WalletBalance from './wallet-balance';
import WalletStatement from './wallet-statement';

type Props = {
  balance: string;
};

export default function WalletHero({ balance = '$0' }: Props): JSX.Element {
  const [valueVisible, setVisible] = useToggle(true);
  const [showAlert, toggleAlert] = useState(false);
  const storageKey = 'testnet-wallet-disclaimer';
  const testnet = currentEnv() === 'testnet' || 'development';

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
              Close
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
        setVisible={setVisible}
        valueVisible={valueVisible}
        value={balance}
      />
      <WalletStatement showValues={valueVisible} />
    </Stack>
  );
}
