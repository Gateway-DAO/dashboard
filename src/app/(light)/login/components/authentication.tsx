'use client';
import Link from 'next/link';
import { useState } from 'react';

import LogoutButton from '@/components/buttons/logout-button';
import { GatewayIcon3 } from '@/components/icons/gateway3';
import routes from '@/constants/routes';

import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Box, IconButton, Stack } from '@mui/material';

import { ChooseEmail } from '../sections/choose-email';
import { ChooseGatewayId } from '../sections/choose-gateway-id';
import { ConnectMoreAuthDialog } from '../sections/completed';
import { AuthenticationInitial } from '../sections/initial';
import { VerifyEmailAddToken } from '../sections/verify-email-add-token';
import { VerifyEmailLoginToken } from '../sections/verify-email-login-token';

export function Authentication() {
  const [canShowClose, setCanShowClose] = useState(false);
  const [step, setStep] = useState('initial');

  return (
    <Stack
      sx={{
        height: '100%',
        background:
          'linear-gradient(86deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 15%, rgba(126,59,220,1) 62%, rgba(0,117,255,1) 100%)',
        backgroundImage: 'url(/images/signup-background-light.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      {canShowClose ? (
        <IconButton
          component={Link}
          href={routes.home}
          sx={{
            width: 40,
            height: 40,
            alignSelf: 'center',
            position: 'absolute',
            top: { xs: 10, md: 38 },
            right: { xs: 20, md: 48 },
            zIndex: 1,
            cursor: 'pointer',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : (
        <LogoutButton />
      )}
      <Stack
        gap={2}
        sx={{
          maxWidth: { xs: '100%', md: '50%', lg: '582px' },
          width: '100%',
          backdropFilter: 'blur(25px)',
          px: { xs: 2, md: 6 },
          justifyContent: 'center',
          height: '100%',
          borderRight: '1px solid rgba(229, 229, 229, 0.4)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 20, md: 48 },
            left: { xs: 20, md: 48 },
          }}
        >
          <GatewayIcon3 />
        </Box>
        <>
          {step === 'initial' && <AuthenticationInitial />}
          {step === 'verify-email-login-code' && <VerifyEmailLoginToken />}
          {step === 'choose-email' && <ChooseEmail />}
          {step === 'verify-email-add-code' && <VerifyEmailAddToken />}
          {step === 'choose-gatewayid' && <ChooseGatewayId />}

          <ConnectMoreAuthDialog
            open={step === 'completed'}
            onClose={routes.home}
          />
        </>
      </Stack>
    </Stack>
  );
}
