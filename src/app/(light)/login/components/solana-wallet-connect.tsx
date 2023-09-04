'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import routes from '@/constants/routes';
import { Chain } from '@/services/protocol/types';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { TbCurrencySolana } from 'react-icons/tb';

import { Button } from '@mui/material';

import useLoginWallet from '../libs/use-login-wallet';

type Props = {
  onFirstModal: (value: boolean) => void;
};

export default function SolanaWalletConnect({ onFirstModal }: Props) {
  const { setVisible } = useWalletModal();
  const { disconnect, publicKey, signMessage } = useWallet();
  const router = useRouter();

  const address = publicKey?.toString();

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
      await login(wallet);
      router.push(routes.dashboardUserHome);
    } catch (error) { }
  };

  useEffect(() => {
    if (address) onLogin(address);
  }, [address]);

  return (
    <Button
      variant="contained"
      startIcon={<TbCurrencySolana fontSize="24" />}
      onClick={() => {
        onFirstModal(false);
        setVisible(true);
      }}
    >
      Solana
    </Button>
  );
}
