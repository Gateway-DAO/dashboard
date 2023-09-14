'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import Loading from '@/components/loadings/loading/loading';
import routes from '@/constants/routes';
import { Chain } from '@/services/protocol/types';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import useLoginWallet from '../libs/use-login-wallet';
import { CustomEvmButton } from './custom-evm-button';

type Props = {
  onFirstModal: (value: boolean) => void;
  isEvmLoading: (value: boolean) => void;
};

export default function EvmWalletConnect({
  onFirstModal,
  isEvmLoading,
}: Props) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { login, isLoading } = useLoginWallet({
    address,
    chain: Chain.Evm,
    disconnect,
    signMessage(message: string) {
      return signMessageAsync({ message });
    },
  });

  const onLogin = async (wallet: string) => {
    try {
      await login(wallet);
      //TODO: Make it reusable
      const callbackUrl = searchParams.get('callbackUrl');
      router.push(callbackUrl ?? routes.dashboardUserHome);
    } catch (error) {}
  };

  useEffect(() => {
    if (address) onLogin(address);
  }, [address]);

  useEffect(() => {
    isLoading ? isEvmLoading(true) : isEvmLoading(false);
  }, [isLoading]);

  if (isLoading) {
    return <Loading size={24} />;
  }

  return <CustomEvmButton onFirstModal={onFirstModal} />;
}
