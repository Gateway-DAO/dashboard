import { PropsWithChildren, createContext, useContext, useState } from "react";

export type WalletLoadingStep = "pending" | "signing" | "loading" | "finished" | "error"

type State = {
  step: WalletLoadingStep;
  error?: string;
}

type Context = State & {
  onPending: () => void;
  onSigning: () => void;
  onLoading: () => void;
  onFinished: () => void;
  onError: (error: string) => void;
}

const WalletConnectionContext = createContext<Context>({
  step: "pending",
  onPending: () => { },
  onSigning: () => { },
  onLoading: () => { },
  onFinished: () => { },
  onError: () => { },
});

/**
 * Provider to handle the wallet connection state
 */
export default function WalletConnectionProvider({ children }: PropsWithChildren) {
  const [{ step, error }, setStep] = useState<State>({ step: "pending" });

  const onPending = () => {
    setStep({ step: "pending" })
  }

  const onSigning = () => {
    setStep({ step: "signing" })
  };
  const onLoading = () => {
    setStep({ step: "loading" })
  };
  const onFinished = () => {
    setStep({ step: "finished" })
  };
  const onError = (newError: string) => {
    setStep({ step: "error", error: newError })
  };

  return (
    <WalletConnectionContext.Provider value={{ step, error, onPending, onSigning, onLoading, onFinished, onError }}>
      {children}
    </WalletConnectionContext.Provider>
  );
}

export const useWalletConnectionStep = () => useContext(WalletConnectionContext);
