"use client";

import { signIn, signOut } from "next-auth/react";
import { useState } from "react";

import { apiPublic } from "@/services/protocol/api";
import { Chain } from "@/services/protocol/types";
import { useMutation } from "@tanstack/react-query";

type Props = {
  address?: string;
  chain: Chain;
  signMessage: (message: string) => Promise<string>;
  disconnect: () => void;
}

export default function useLoginWallet({ address, chain, disconnect, signMessage }: Props) {
  const [error, setError] = useState<unknown | null>(null);

  const onDisconnect = (error: unknown) => {
    disconnect()
    signOut({ redirect: false })
    throw error;
  }

  const { mutateAsync: getNonce, isLoading: isLoadingNonce } = useMutation({
    mutationKey: ['get-nonce', address],
    mutationFn: async (wallet: string) => (await apiPublic.get_nonce({ wallet, chain })).createWalletNonce.message,
    onError: onDisconnect,
  })

  const { mutateAsync: getSignature, isLoading: isLoadingSignature } = useMutation({
    mutationKey: ['get-signature', address],
    mutationFn: (nonce: string) => signMessage(nonce),
    onError: onDisconnect,
  })

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
      setError(null);
      const nonce = await getNonce(wallet);
      const signature = await getSignature(nonce);
      await loginWallet(signature);
    } catch (error) {
      onDisconnect(error);
      throw error;
    }
  }

  return {
    login,
    error,
    isLoading: isLoadingNonce || isLoadingSignature || isLoadingWallet,
  }

}
