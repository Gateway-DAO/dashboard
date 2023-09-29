'use client';

import { useEffect } from 'react';

import Loading from '@/components/loadings/loading/loading';
import { Chain } from '@/services/protocol/types';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

import useAddWallet from '../../../libs/use-add-wallet';
import useLoginWallet from '../../../libs/use-login-wallet';
import useStepHandler from '../../../utils/use-step-handler';
import { CustomEvmButton } from '../../custom-evm-button';

type Props = {
  onClose: () => void;
  isEvmLoading: (value: boolean) => void;
  isAddWallet?: boolean;
};

export default function EvmWalletConnect({
  onClose,
  isEvmLoading,
  isAddWallet = false,
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

  const { add, isLoading: isLoadingAddWallet } = useAddWallet({
    address,
    chain: Chain.Evm,
    disconnect,
    signMessage(message: string) {
      return signMessageAsync({ message });
    },
  });

  const onLoginOrAdd = async (wallet: string) => {
    try {
      onClose();
      isAddWallet ? add(wallet) : login(wallet);
      await onHandleSession();
    } catch (error) {}
  };

  useEffect(() => {
    if (address) onLoginOrAdd(address);
  }, [address]);

  useEffect(() => {
    isLoading || isLoadingAddWallet ? isEvmLoading(true) : isEvmLoading(false);
  }, [isLoading, isLoadingAddWallet]);

  if (isLoading) {
    return <Loading size={24} />;
  }

  return <CustomEvmButton onClose={onClose} />;
}
