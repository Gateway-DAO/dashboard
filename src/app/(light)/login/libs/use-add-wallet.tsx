'use client';

import { signOut } from 'next-auth/react';

import { useGtwSession } from '@/context/gtw-session-provider';
import { apiPublic } from '@/services/protocol/api';
import { Chain } from '@/services/protocol/types';
import { useMutation } from '@tanstack/react-query';

import { useWalletConnectionStep } from '../providers/wallet-connection-provider';

type Props = {
  address?: string;
  chain: Chain;
  signMessage: (message: string) => Promise<string>;
  disconnect: () => void;
};

const SING_CANCEL_ERRORS = [
  'UserRejectedRequestError',
  'WalletSignMessageError',
];

export default function useAddWallet({
  address,
  chain,
  disconnect,
  signMessage,
}: Props) {
  const { privateApi } = useGtwSession();
  const { onPending, onSigning, onLoading, onSuccess, onError } =
    useWalletConnectionStep();

  const onDisconnect = () => {
    disconnect();
    signOut({ redirect: false });
  };

  const { mutateAsync: getNonce, isLoading: isLoadingNonce } = useMutation({
    mutationKey: ['get-nonce', address],
    mutationFn: async (wallet: string) =>
      (await apiPublic.get_nonce({ wallet, chain })).createWalletNonce.message,
  });

  const { mutateAsync: getSignature, isLoading: isLoadingSignature } =
    useMutation({
      mutationKey: ['get-signature', address],
      mutationFn: (nonce: string) => signMessage(nonce),
    });

  const { mutateAsync: addWallet, isLoading: isLoadingWallet } = useMutation({
    mutationKey: ['add-wallet', address],
    mutationFn: async (signature: string) => {
      const res = await privateApi.protocol_add_wallet_confirmation({
        signature,
        wallet: address as string,
        chain,
      });

      if (!res || (res && !res.addWalletConfirmation.id)) {
        throw new Error('Could not add wallet');
      }
    },
    onError: onDisconnect,
  });

  const add = async (wallet: string) => {
    try {
      onSigning();
      const nonce = await getNonce(wallet);
      const signature = await getSignature(nonce);
      onLoading();
      await addWallet(signature);
      onSuccess();
    } catch (error: any) {
      if (SING_CANCEL_ERRORS.includes(error?.name)) {
        onPending();
      } else {
        onError(!!error?.message ? error.message : JSON.stringify(error));
      }
      onDisconnect();
    }
  };

  return {
    add,
    isLoading: isLoadingNonce || isLoadingSignature || isLoadingWallet,
  };
}
