'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import Loading from '@/components/loadings/loading/loading';
import routes from '@/constants/routes';
import { Chain } from '@/services/protocol/types';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import useLoginWallet from '../../../libs/use-login-wallet';
import useStepHandler from '../../../utils/use-step-handler';
import { CustomEvmButton } from '../../custom-evm-button';


type Props = {
  onClose: () => void;
  isEvmLoading: (value: boolean) => void;
};

export default function EvmWalletConnect({
  onClose,
  isEvmLoading,
}: Props) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const onHandleSession = useStepHandler();

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
      await onHandleSession();
    } catch (error) { }
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

  return <CustomEvmButton onClose={onClose} />;
}
