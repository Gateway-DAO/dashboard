'use client';
import { Fragment, useMemo } from 'react';

import { WalletIconsTransition } from '@/components/wallet-icons-transition/wallet-icons-transition';
import { auth } from '@/locale/en/auth';
import { FaDiscord } from 'react-icons/fa';

import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, Link, Stack, Typography } from '@mui/material';

export function AuthenticationOptions() {
  const orSignUpMethods = useMemo(() => {
    return [
      {
        id: 'wallet',
        methodName: auth.steps.initial.connect_wallet,
        icon: <WalletIconsTransition />,
        onClick: () => console.log('Login'),
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

  return (
    <>
      <Typography
        alignSelf={'center'}
        textTransform={'uppercase'}
        color="text.secondary"
      >
        {auth.steps.initial.or}
      </Typography>
      <Stack gap={2.5}>
        {orSignUpMethods
          .filter((method) => method.isVisible)
          .map((method) => (
            <Fragment key={method.id}>
              <Button
                id={method.methodName}
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
      <Typography color="text.secondary" variant="caption">
        {auth.steps.initial.terms_info}{' '}
        <Link href="/terms" underline="none">
          {auth.steps.initial.terms_of_service}{' '}
        </Link>
      </Typography>
    </>
  );
}
