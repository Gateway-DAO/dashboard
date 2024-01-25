'use client';

import { usePokt } from '@/context/pokt-provider';
import { WalletConnectionStateHandlers } from '@/context/wallet-connection-provider';
import { getErrorMessage } from '@/locale/en/errors';
import { Chain } from '@/services/protocol/types';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import { useSignMessage } from 'wagmi';

import useDisconnectWallets from './use-disconnect-wallets';

type OnSignedMessage = {
  signature: string;
  wallet: string;
  publicKey?: string;
  chain: Chain;
};

type Props = {
  onGetNonce: (wallet: string, chain: Chain) => Promise<string>;
  onSignedMessage: (data: OnSignedMessage) => void;
  statesHandler?: WalletConnectionStateHandlers;
};

const SING_CANCEL_ERRORS = [
  'UserRejectedRequestError',
  'WalletSignMessageError',
];

export default function useConnectWallet({
  onGetNonce,
  onSignedMessage,
  statesHandler,
}: Props) {
  const { signMessage: signMessageSolana } = useWallet();
  const { signMessageAsync: signMessageEvm } = useSignMessage();
  const { signMessage: signMessagePokt } = usePokt();

  const onSigneMessageSolana = async (message: string) => {
    if (!signMessageSolana) {
      throw new Error("Solana isn't connected");
    }
    const signature = await signMessageSolana(
      new TextEncoder().encode(message)
    );
    const bs58 = (await import('bs58')).default;
    return bs58.encode(signature as Uint8Array);
  };

  const onDisconnectWallets = useDisconnectWallets();

  const {
    mutateAsync: getNonce,
    isLoading: isLoadingNonce,
    reset: resetNonce,
  } = useMutation({
    mutationKey: ['get-nonce'],
    mutationFn: async ({ wallet, chain }: { wallet: string; chain: Chain }) =>
      onGetNonce(wallet, chain),
  });

  const {
    mutateAsync: getSignature,
    isLoading: isLoadingSignature,
    reset: resetSignature,
  } = useMutation({
    mutationKey: ['get-signature'],
    mutationFn: async ({ nonce, chain }: { nonce: string; chain: Chain }) => {
      switch (chain) {
        case Chain.Evm:
          return signMessageEvm({ message: nonce });
        case Chain.Sol:
          return onSigneMessageSolana(nonce);
        case Chain.Pokt:
          return signMessagePokt(nonce);
        default:
          throw new Error('Invalid chain');
      }
    },
  });

  const {
    mutateAsync: connectWallet,
    isLoading: isLoadingWalletConnection,
    reset: resetWallet,
  } = useMutation({
    mutationKey: ['connect-wallet-signature'],
    mutationFn: async (data: OnSignedMessage) => onSignedMessage(data),
    onError: onDisconnectWallets,
  });

  const onConnect = async (
    wallet: string,
    chain: Chain,
    publicKey?: string
  ) => {
    try {
      statesHandler?.onSigning?.();
      const nonce = await getNonce({
        wallet,
        chain,
      });
      const signature = await getSignature({
        nonce,
        chain,
      });
      statesHandler?.onLoading?.();
      await connectWallet({ signature, wallet, publicKey, chain });
      resetNonce();
      resetSignature();
      resetWallet();
      statesHandler?.onSuccess?.();
    } catch (error: any) {
      if (SING_CANCEL_ERRORS.includes(error?.name)) {
        statesHandler?.onPending?.();
      } else {
        const { message } = getErrorMessage(error);
        statesHandler?.onError?.(message);
      }
      onDisconnectWallets();
    }
  };

  return {
    onConnect,
    isLoading:
      isLoadingNonce || isLoadingSignature || isLoadingWalletConnection,
    onDisconnectWallets,
  };
}
