"use client";

import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import routes from '@/constants/routes';
import { apiPublic } from '@/services/protocol/api';
import { Chain } from '@/services/protocol/types';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useMutation } from '@tanstack/react-query';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

export default function EvmWalletConnect() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();

  const onDisconnect = () => {
    disconnect()
    signOut({ redirect: false })
  }

  const { mutateAsync: getNonce, isLoading: isLoadingNonce } = useMutation({
    mutationKey: ['get-nonce', address],
    mutationFn: async (wallet: string) => (await apiPublic.get_nonce({ wallet, chain: Chain.Evm })).createWalletNonce.message,
    onError: onDisconnect,
  })

  const { mutateAsync: getSignature, isLoading: isLoadingSignature } = useMutation({
    mutationKey: ['get-signature', address],
    mutationFn: (nonce: string) => signMessageAsync({ message: nonce }),
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
      const nonce = await getNonce(wallet);
      const signature = await getSignature(nonce);
      await loginWallet(signature);
      router.push(routes.dashboardUser)
    } catch (error) {
      onDisconnect();
    }
  }

  useEffect(() => {
    if (address) login(address)
  }, [address])

  if (isLoadingNonce || isLoadingSignature || isLoadingWallet) {
    return (
      <div>Connecting</div>
    )
  }

  return (
    <ConnectButton />
  )
}
