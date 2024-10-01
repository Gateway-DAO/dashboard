'use client';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';

import { WalletAddress } from '@/services/api/models';

import AddIcon from '@mui/icons-material/Add';
import { Button, Card, Stack, Typography } from '@mui/material';

import AddWalletModal from './add-wallet-modal';
import Wallet, { WalletLoading } from './wallet';

export function EditConnectedWallet() {
  const [isAddWalletDialog, setAddWalletDialog] = useState<boolean>(false);
  const { data: session } = useSession();

  const walletList = useMemo(() => {
    if (!session?.user.wallet_addresses) return [];
    return session.user.wallet_addresses.reduce((acc, wallet) => {
      if (wallet.address === session.wallet_address) {
        acc.unshift(wallet);
      } else {
        acc.push(wallet);
      }
      return acc;
    }, [] as WalletAddress[]);
  }, [session?.user.wallet_addresses]);

  return (
    <>
      <Card
        component={Stack}
        variant="outlined"
        maxWidth={591}
        width="100%"
        height="auto"
        bgcolor="white"
        padding={2}
        gap={4}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography variant="subtitle1">Connected wallet</Typography>
            <Typography variant="body2">
              Connected wallets to your Gateway ID
            </Typography>
          </Stack>
          <Stack>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setAddWalletDialog(true)}
              disabled={!session}
            >
              Add
            </Button>
          </Stack>
        </Stack>
        <Stack gap={2}>
          {session && walletList.length ? (
            walletList.map((wallet) => {
              const isRemovable =
                session.wallet_address !== wallet.address &&
                session.user.wallet_addresses.length > 1;
              return (
                <Wallet key={wallet.id} {...wallet} removable={isRemovable} />
              );
            })
          ) : (
            <WalletLoading />
          )}
        </Stack>
      </Card>
      {!!session?.token && (
        <AddWalletModal
          isOpen={isAddWalletDialog}
          onClose={() => setAddWalletDialog(false)}
          token={session.token}
        />
      )}
    </>
  );
}
