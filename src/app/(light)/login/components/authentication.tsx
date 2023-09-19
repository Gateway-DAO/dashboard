'use client';
import { useState } from 'react';

import routes from '@/constants/routes';

import AuthenticationLayout from './authentication-layout';
import { ChooseGatewayId } from './sections/choose-gateway-id';
import { ConnectMoreAuthDialog } from './sections/completed';
import { AuthenticationInitial } from './sections/initial';
import { VerifyEmailAddToken } from './sections/verify-email-add-token';
import { VerifyEmailLoginToken } from './sections/verify-email-login-token';
import { Step } from './types';

export function Authentication() {
  const [step, _setStep] = useState<Step>('initial');

  return (
    <AuthenticationLayout step={step}>
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
