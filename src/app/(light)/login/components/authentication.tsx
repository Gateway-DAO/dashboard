'use client';

import { signOut } from 'next-auth/react';

import routes from '@/constants/routes';


import { useStepState } from '../providers/step-provider';
import AuthenticationLayout from './authentication-layout';
import AddEmail from './sections/add-email';
import { ChooseGatewayId } from './sections/choose-gateway-id';
import { AuthenticationInitial } from './sections/initial/initial';
import { VerifyEmailAddToken } from './sections/verify-email-add-token';
import { VerifyEmailLoginToken } from './sections/verify-email-login-token';

export function Authentication() {
  const { step, setStepState } = useStepState()

  if (step === "verify-email-login-code") {
    return <AuthenticationLayout closeButonProps={{
      onClick: () => setStepState({ step: "initial" })
    }}>
      <VerifyEmailLoginToken />
    </AuthenticationLayout>
  }


  if (step === "verify-email-add-code") {
    return <AuthenticationLayout closeButonProps={{
      onClick: () => setStepState({ step: "initial" })
    }}>
      <VerifyEmailAddToken />
    </AuthenticationLayout>
  }

  if (step === "choose-gatewayid") {
    return <AuthenticationLayout closeButonProps={{
      onClick: async () => {
        await signOut({ redirect: false });
        setStepState({ step: "initial" })
      }
    }}>
      <ChooseGatewayId />
    </AuthenticationLayout>
  }

  if (step === "add-email") {
    return <AuthenticationLayout closeButonProps={{
      onClick: async () => {
        await signOut({ redirect: false });
        setStepState({ step: "initial" })
      }
    }}>
      <AddEmail />
    </AuthenticationLayout>
  }


  return (
    <AuthenticationLayout closeButonProps={{
      href: routes.home,
    }}>
      <AuthenticationInitial />
    </AuthenticationLayout>
  );
}
