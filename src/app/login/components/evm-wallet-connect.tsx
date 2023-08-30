'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import routes from '@/constants/routes';
import { Chain } from '@/services/protocol/types';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import useLoginWallet from '../libs/use-login-wallet';

export default function EvmWalletConnect() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();

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
      router.push(routes.dashboardUser);
    } catch (error) {}
  };

  useEffect(() => {
    if (address) onLogin(address);
  }, [address]);

  if (isLoading) {
    return <div>Connecting</div>;
  }

  return <ConnectButton />;
}
