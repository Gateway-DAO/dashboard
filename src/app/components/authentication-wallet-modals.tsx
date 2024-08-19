import { signIn } from 'next-auth/react';

import WalletConnectModal from '@/components/wallet-modal/wallet-connect-modal';
import WalletLoadingModal from '@/components/wallet-modal/wallet-loading-modal';
import { useWalletConnectionStep } from '@/services/wallets/wallet-connection-provider';
import { Network } from '@/types/web3';

import useLoginStepHandler from './step-provider/use-login-step-handler';
import useConnectWallet from './use-connect-wallet';

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
    async onGetNonce(wallet, network) {
      return '';
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
    network: Network,
    publicKey?: string
  ) => {
    onCancel();
    onConnect(address, network, publicKey);
  };

  return (
    <>
      <WalletConnectModal
        title="Connect wallet"
        description="Select a network and choose one of available wallet providers to enter"
        isOpen={isOpen}
        onConnect={onConnectWallet}
        onCancel={onCancel}
      />
      <WalletLoadingModal onDisconnect={onDisconnectWallets} />
    </>
  );
}
