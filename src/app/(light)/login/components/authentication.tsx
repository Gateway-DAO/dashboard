'use client';
import { useState } from 'react';

import routes from '@/constants/routes';

import StepProvider, { useStepState } from '../providers/step-provider';
import { Step } from '../types';
import AuthenticationLayout from './authentication-layout';
import { ChooseGatewayId } from './sections/choose-gateway-id';
import { ConnectMoreAuthDialog } from './sections/completed';
import { AuthenticationInitial } from './sections/initial/initial';
import { VerifyEmailAddToken } from './sections/verify-email-add-token';
import { VerifyEmailLoginToken } from './sections/verify-email-login-token/verify-email-login-token';

export function Authentication() {
  const { step } = useStepState()
  return (
    <AuthenticationLayout>
      {step === 'initial' && <AuthenticationInitial />}
      {step === 'verify-email-login-code' && <VerifyEmailLoginToken />}
      {step === 'verify-email-add-code' && <VerifyEmailAddToken />}
      {step === 'choose-gatewayid' && <ChooseGatewayId />}

      <ConnectMoreAuthDialog
        open={step === 'completed'}
        onClose={routes.home}
      />
    </AuthenticationLayout>
  );
}
