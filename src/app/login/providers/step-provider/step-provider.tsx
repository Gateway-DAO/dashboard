'use client';
import { Session } from 'next-auth';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

import getLoginStep from './get-step';
import { LoginStep } from './types';

type LoginState = {
  step: LoginStep;
  values?: {
    email: string;
  };
};

type LoginStepContextType = {
  setStepState: (step: LoginState) => void;
} & LoginState;

const LoginStepContext = createContext<LoginStepContextType>(
  {} as LoginStepContextType
);
/**
 * Provider to handle the login/signup step state, and store the email value
 */
export default function LoginStepProvider({
  children,
  session,
}: PropsWithChildren<{ session: Session | null }>) {
  const [state, setStepState] = useState<LoginState>(() => {
    const step = getLoginStep(session);
    return {
      step,
    };
  });

  return (
    <LoginStepContext.Provider value={{ ...state, setStepState }}>
      {children}
    </LoginStepContext.Provider>
  );
}

export const useLoginStepState = () => useContext(LoginStepContext);
