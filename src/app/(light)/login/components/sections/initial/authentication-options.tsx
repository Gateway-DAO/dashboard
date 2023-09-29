'use client';
import { Fragment, useMemo, useState } from 'react';

import { WalletIconsTransition } from '@/components/wallet-icons-transition/wallet-icons-transition';
import WalletConnectionProvider from '@/context/wallet-connection-provider';
import useDisconnectWallets from '@/hooks/use-disconnect-wallets';
import { auth } from '@/locale/en/auth';
import { FaDiscord } from 'react-icons/fa';

import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, Stack, Typography } from '@mui/material';

import AuthenticationWalletModals from './authentication-wallet-modals';

export function AuthenticationOptions() {
  const [isModalWaleltOpen, setModalWallet] = useState(false);
  const onDisconnectWallets = useDisconnectWallets();

  const orSignUpMethods = useMemo(() => {
    return [
      {
        id: 'wallet',
        methodName: auth.steps.initial.connect_wallet,
        icon: <WalletIconsTransition />,
        onClick: async () => {
          await onDisconnectWallets();
          setModalWallet(true);
        },
        isVisible: true,
      },
      {
        id: 'google',
        methodName: auth.steps.initial.connect_google,
        icon: <GoogleIcon />,
        onClick: () => null,
        isVisible: false,
      },
      {
        id: 'twitter',
        methodName: auth.steps.initial.connect_twitter,
        icon: <TwitterIcon />,
        onClick: () => null,
        isVisible: false,
      },
      {
        id: 'discord',
        methodName: auth.steps.initial.connect_discord,
        icon: <FaDiscord />,
        onClick: () => null,
        isVisible: false,
      },
    ];
  }, []);

  const onCloseModal = () => setModalWallet(false);

  return (
    <>
      <Typography
        alignSelf={'center'}
        textTransform={'uppercase'}
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        {auth.steps.initial.or}
      </Typography>
      <Stack gap={2.5}>
        {orSignUpMethods
          .filter((method) => method.isVisible)
          .map((method) => (
            <Fragment key={method.id}>
              <Button
                id={`connect-${method.id}`}
                key={method.methodName}
                variant="outlined"
                size="large"
                startIcon={method.icon}
                fullWidth
                sx={{
                  height: 48,
                  '& .MuiButton-startIcon	': {
                    position: 'absolute',
                    left: 16,
                  },
                }}
                onClick={method.onClick}
              >
                {method.methodName}
              </Button>
            </Fragment>
          ))}
      </Stack>
      <WalletConnectionProvider>
        <AuthenticationWalletModals
          isOpen={isModalWaleltOpen}
          onCancel={onCloseModal}
        />
      </WalletConnectionProvider>
    </>
  );
}
