'use client';

import { getErrorMessage } from '@/locale/en/errors';
import { WalletConnectionStateHandlers } from '@/services/wallets/wallet-connection-provider';
import { Network } from '@/types/web3';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import bs58 from 'bs58';
import { useSignMessage } from 'wagmi';

import useDisconnectWallets from './use-disconnect-wallets';

type OnSignedMessage = {
  signature: string;
  wallet: string;
  publicKey?: string;
  network: Network;
};

type Props = {
  onGetNonce: (wallet: string, network: Network) => Promise<string>;
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

  const onSigneMessageSolana = async (message: string) => {
    if (!signMessageSolana) {
      throw new Error("Solana isn't connected");
    }
    const signature = await signMessageSolana(
      new TextEncoder().encode(message)
    );
    return bs58.encode(signature as Uint8Array);
  };

  const onDisconnectWallets = useDisconnectWallets();

  const {
    mutateAsync: getNonce,
    isPending: isLoadingNonce,
    reset: resetNonce,
  } = useMutation({
    mutationKey: ['get-nonce'],
    mutationFn: async ({
      wallet,
      network,
    }: {
      wallet: string;
      network: Network;
    }) => onGetNonce(wallet, network),
  });

  const {
    mutateAsync: getSignature,
    isPending: isLoadingSignature,
    reset: resetSignature,
  } = useMutation({
    mutationKey: ['get-signature'],
    mutationFn: async ({
      nonce,
      network,
    }: {
      nonce: string;
      network: Network;
    }) => {
      switch (network) {
        case Network.Evm:
          return signMessageEvm({ message: nonce });
        case Network.Sol:
          return onSigneMessageSolana(nonce);
        default:
          throw new Error('Invalid network');
      }
    },
  });

  const {
    mutateAsync: connectWallet,
    isPending: isLoadingWalletConnection,
    reset: resetWallet,
  } = useMutation({
    mutationKey: ['connect-wallet-signature'],
    mutationFn: async (data: OnSignedMessage) => onSignedMessage(data),
    onError: onDisconnectWallets,
  });

  const onConnect = async (
    wallet: string,
    network: Network,
    publicKey?: string
  ) => {
    try {
      statesHandler?.onSigning?.();
      const nonce = await getNonce({
        wallet,
        network,
      });
      const signature = await getSignature({
        nonce,
        network,
      });
      statesHandler?.onLoading?.();
      await connectWallet({ signature, wallet, publicKey, network: network });
      resetNonce();
      resetSignature();
      resetWallet();
      statesHandler?.onSuccess?.();
    } catch (error: any) {
      if (SING_CANCEL_ERRORS.includes(error?.name)) {
        statesHandler?.onPending?.();
      } else {
        statesHandler?.onError?.((error as Error).message);
      }
      onDisconnectWallets();
    }
  };

  return {
    onConnect,
    isPending:
      isLoadingNonce || isLoadingSignature || isLoadingWalletConnection,
    onDisconnectWallets,
  };
}
