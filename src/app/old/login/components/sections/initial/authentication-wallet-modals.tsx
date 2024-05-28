import { signIn } from 'next-auth/react';

import WalletConnectModal from '@/components/wallet-modal/wallet-connect-modal';
import WalletLoadingModal from '@/components/wallet-modal/wallet-loading-modal';
import { useWalletConnectionStep } from '@/context/wallet-connection-provider';
import useConnectWallet from '@/hooks/use-connect-wallet';
import { apiPublic } from '@/services/protocol/api';
import { Chain } from '@/services/protocol/types';

import useLoginStepHandler from '../../../providers/step-provider/use-login-step-handler';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
};

export default function AuthenticationWalletModals({
  isOpen,
  onCancel,
}: Props) {
  const connectionStep = useWalletConnectionStep();
  const onHandleStep = useLoginStepHandler();
  const { onConnect, onDisconnectWallets } = useConnectWallet({
    async onGetNonce(wallet, chain) {
      return (await apiPublic.get_nonce({ wallet, chain })).createWalletNonce
        .message;
    },
    async onSignedMessage({ signature, wallet, publicKey }) {
      const res = await signIn('credential-wallet', {
        redirect: false,
        wallet,
        signature,
        publicKey,
      });

      if (!res || (res && !res.ok)) {
        throw new Error('Could not login');
      }

      if (res.error) {
        throw new Error(res.error);
      }
      await onHandleStep();
    },
    statesHandler: connectionStep,
  });

  const onConnectWallet = (
    address: string,
    chain: Chain,
    publicKey?: string
  ) => {
    onCancel();
    onConnect(address, chain, publicKey);
  };

  return (
    <>
      <WalletConnectModal
        title="Connect wallet"
        description="Select a chain and choose one of available wallet providers or create a new wallet."
        isOpen={isOpen}
        onConnect={onConnectWallet}
        onCancel={onCancel}
      />
      <WalletLoadingModal onDisconnect={onDisconnectWallets} />
    </>
  );
}
