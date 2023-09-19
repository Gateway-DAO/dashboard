'use client';
import Link from 'next/link';
import { useState } from 'react';

import LogoutButton from '@/components/buttons/logout-button/logout-button';
import GatewayIcon from '@/components/icons/gateway';
import GatewaySquaredIcon from '@/components/icons/gateway-squared';
import routes from '@/constants/routes';
import { common } from '@/locale/en/common';

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Stack, Typography, alpha } from '@mui/material';

import Background from './background';
import { ChooseEmail } from './sections/choose-email';
import { ChooseGatewayId } from './sections/choose-gateway-id';
import { ConnectMoreAuthDialog } from './sections/completed';
import { AuthenticationInitial } from './sections/initial';
import { VerifyEmailAddToken } from './sections/verify-email-add-token';
import { VerifyEmailLoginToken } from './sections/verify-email-login-token';

export function Authentication() {
  const [step, _setStep] = useState('initial');

  return (
    <Stack
      sx={{
        height: '100%',
      }}
      direction="row"
    >

      <Box sx={{
        pt: 6,
        px: { xs: 2, lg: 6 },
        display: 'flex',
        flexDirection: 'column',
        maxWidth: { xs: '100%', lg: '582px' },
        width: '100%',
        height: '100%',
        borderRightWidth: {
          xs: 0,
          lg: 1
        },
        borderRightStyle: {
          xs: "none",
          lg: 'solid'
        },
        borderRightColor: 'divider',
      }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2} sx={{
          mb: {
            xs: 8,
            lg: 2
          }
        }}>
          <Stack alignItems="center" direction="row" justifySelf="flex-start">
            <GatewaySquaredIcon sx={{ fontSize: 40 }} />
            <Typography component="h1" ml={1} color="black" fontWeight="bold">
              {common.general.gateway}
            </Typography>
          </Stack>
          <IconButton
            component={Link}
            href={routes.home}
            sx={{
              display: {
                xs: "flex",
                lg: "none"
              },
              width: 40,
              height: 40,
              cursor: 'pointer',
              background: "rgba(0, 0, 0, 0.08)"
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: {
              xs: 'flex-start',
              lg: 'center',
            },
          }}
        >
          {/* <GatewayIcon colored /> */}
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
        </Box>

      </Box>
      <Box sx={{
        display: {
          xs: "none",
          lg: "flex"
        },
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: theme => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
        p: { xs: 2, lg: 6 },
        alignItems: "stretch",
        justifyContent: "stretch",
        position: "relative",
      }}>
        <IconButton
          component={Link}
          href={routes.home}
          sx={{
            width: 40,
            height: 40,
            alignSelf: 'center',
            position: 'absolute',
            top: { xs: 10, lg: 48 },
            right: { xs: 20, lg: 48 },
            zIndex: 1,
            cursor: 'pointer',
            background: "rgba(0, 0, 0, 0.08)"
          }}
        >
          <CloseIcon />
        </IconButton>
        <Background sx={{ flex: 1, height: "100%" }} />
      </Box>
    </Stack>
  );
}
