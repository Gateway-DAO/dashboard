/* eslint-disable @typescript-eslint/no-empty-function */
import { PropsWithChildren, createContext, useContext, useState } from 'react';

import EvmProvider from './evm-provider/evm-provider';
import SolanaProvider from './solana-proivder/solana-provider';
import SuiProvider from './sui-provider/sui-provider';

export type WalletLoadingStep =
  | 'pending'
  | 'signing'
  | 'loading'
  | 'success'
  | 'signup'
  | 'error';

type State = {
  step: WalletLoadingStep;
  error?: string;
};

export type WalletConnectionStateHandlers = {
  onPending: () => void;
  onSigning: () => void;
  onLoading: () => void;
  onSuccess: () => void;
  onSignup: () => void;
  onError: (error: string) => void;
};

type Context = State & WalletConnectionStateHandlers;

const WalletConnectionContext = createContext<Context>({
  step: 'pending',
  onPending: () => {},
  onSigning: () => {},
  onLoading: () => {},
  onSuccess: () => {},
  onSignup: () => {},
  onError: () => {},
});

/**
 * Provider to handle the wallet connection state
 */
export default function WalletConnectionProvider({
  children,
}: PropsWithChildren) {
  const [{ step, error }, setStep] = useState<State>({ step: 'pending' });

  const onPending = () => {
    setStep({ step: 'pending' });
  };

  const onSigning = () => {
    setStep({ step: 'signing' });
  };
  const onLoading = () => {
    setStep({ step: 'loading' });
  };

  const onSuccess = () => {
    setStep({ step: 'success' });
  };

  const onSignup = () => {
    setStep({ step: 'signup' });
  };

  const onError = (newError: string) => {
    setStep({ step: 'error', error: newError });
  };

  return (
    <EvmProvider>
      <SolanaProvider>
        <SuiProvider>
          <WalletConnectionContext.Provider
            value={{
              step,
              error,
              onPending,
              onSigning,
              onLoading,
              onSuccess,
              onError,
              onSignup,
            }}
          >
            {children}
          </WalletConnectionContext.Provider>
        </SuiProvider>
      </SolanaProvider>
    </EvmProvider>
  );
}

export const useWalletConnectionStep = () =>
  useContext(WalletConnectionContext);
