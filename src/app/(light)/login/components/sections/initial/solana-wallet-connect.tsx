'use client';
import { useEffect } from 'react';

import SolanaIcon from '@/components/icons/solana';
import { Chain } from '@/services/protocol/types';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import useLoginWallet from '../../../libs/use-login-wallet';
import useStepHandler from '../../../utils/use-step-handler';
import WalletModalButton from '../../wallet-modal-button';

type Props = {
  onClose: () => void;
};

export default function SolanaWalletConnect({ onClose }: Props) {
  const { setVisible } = useWalletModal();
  const { disconnect, publicKey, signMessage } = useWallet();

  const address = publicKey?.toString();

  const onHandleSession = useStepHandler();

  const { login } = useLoginWallet({
    address,
    chain: Chain.Sol,
    disconnect,
    async signMessage(message: string) {
      const signature = await signMessage!(new TextEncoder().encode(message));
      const bs58 = (await import('bs58')).default;
      return bs58.encode(signature as Uint8Array);
    },
  });

  const onLogin = async (wallet: string) => {
    try {
      onClose();
      await login(wallet);
      await onHandleSession();
    } catch (error) {}
  };

  useEffect(() => {
    if (address) {
      onLogin(address);
    }
  }, [address]);

  return (
    <WalletModalButton
      startIcon={<SolanaIcon sx={{ fontSize: '24' }} />}
      onClick={() => {
        setVisible(true);
      }}
    >
      Solana
    </WalletModalButton>
  );
}
