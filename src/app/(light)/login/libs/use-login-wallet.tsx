'use client';

import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

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

export default function useLoginWallet({
  address,
  chain,
  disconnect,
  signMessage,
}: Props) {
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

  const { mutateAsync: loginWallet, isLoading: isLoadingWallet } = useMutation({
    mutationKey: ['login-wallet', address],
    mutationFn: async (signature: string) => {
      const res = await signIn('credential-wallet', {
        redirect: false,
        wallet: address,
        signature,
      });

      if (!res || (res && !res.ok)) {
        throw new Error('Could not login');
      }

      if (res.error) {
        throw new Error(res.error);
      }
    },
    onError: onDisconnect,
  });

  const login = async (wallet: string) => {
    try {
      onSigning();
      const nonce = await getNonce(wallet);
      const signature = await getSignature(nonce);
      onLoading();
      await loginWallet(signature);
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
    login,
    isLoading: isLoadingNonce || isLoadingSignature || isLoadingWallet,
  };
}
