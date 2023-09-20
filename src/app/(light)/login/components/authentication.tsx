'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import routes from '@/constants/routes';

import { Skeleton } from '@mui/material';

import StepProvider, { useStepState } from '../providers/step-provider';
import { Step } from '../types';
import AuthenticationLayout from './authentication-layout';
import { CloseButtonProps } from './close-button';
import { ChooseGatewayId } from './sections/choose-gateway-id';
import { ConnectMoreAuthDialog } from './sections/completed';
import { AuthenticationInitial } from './sections/initial/initial';
import { VerifyEmailAddToken } from './sections/verify-email-add-token';
import { VerifyEmailLoginToken } from './sections/verify-email-login-token/verify-email-login-token';

export function Authentication() {
  const { step, setStepState } = useStepState()
  const { data: session, status } = useSession();

  let closeButonProps: CloseButtonProps = {
    href: routes.home,
  }

  if (step === "verify-email-login-code") {
    closeButonProps = {
      onClick: () => setStepState({ step: "initial" })
    }
  }
  if (status === "loading") {

    return <AuthenticationLayout closeButonProps={closeButonProps}>
      <Skeleton variant="text" width="100%" height={80} />
      <Skeleton variant="text" width="80%" height={50} />
      <Skeleton variant="text" width="100%" height={90} sx={{ marginTop: 4 }} />
    </AuthenticationLayout>
  }
  return (
    <StepProvider session={session}>
      <AuthenticationLayout closeButonProps={closeButonProps}>
        {step === 'initial' && <AuthenticationInitial />}
        {step === 'verify-email-login-code' && <VerifyEmailLoginToken />}
        {step === 'verify-email-add-code' && <VerifyEmailAddToken />}
        {step === 'choose-gatewayid' && <ChooseGatewayId />}

        <ConnectMoreAuthDialog
          open={step === 'completed'}
          onClose={routes.home}
        />
      </AuthenticationLayout>
    </StepProvider>
  );
}
