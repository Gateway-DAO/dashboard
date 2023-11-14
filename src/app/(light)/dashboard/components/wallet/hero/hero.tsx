'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { queries } from '@/constants/queries';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { sandboxWalletAlert } from '@/locale/en/alert-messages';
import { common } from '@/locale/en/common';
import { wallet } from '@/locale/en/wallet';
import { My_BalanceQuery } from '@/services/protocol/types';
import { CONTAINER_PX } from '@/theme/config/style-tokens';
import { currentEnv } from '@/utils/env';
import { useQuery } from '@tanstack/react-query';

import { Alert, AlertTitle, Button, Stack, Typography } from '@mui/material';

import { useWalletStore } from '../../../stores/wallet.store';
import WalletBalance from './wallet-balance';
import WalletStatement from './wallet-statement';

type Props = {
  balance: string;
};

export default function WalletHero({ balance = '$0' }: Props): JSX.Element {
  const { showValues: valueVisible, toggleShowValue: toggleVisible } =
    useWalletStore((state) => state);
  const [showAlert, toggleAlert] = useState(false);
  const storageKey = 'testnet-wallet-disclaimer';
  const testnet = currentEnv() === 'testnet' || 'development';
  const { data: session } = useSession();
  const { privateApi } = useGtwSession();
  const { organization } = useOrganization();
  const { data: myWallet, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      queries.my_wallet,
      organization ? organization.id : session?.user.id,
    ],
    queryFn: () =>
      privateApi.my_balance({
        organizationId: organization?.id as string,
      }),
    select: (data: My_BalanceQuery) => data.myWallet,
  });

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
