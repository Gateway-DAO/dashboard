import { signIn } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';

import WalletConnectModal from '@/components/wallet-modal/wallet-connect-modal';
import WalletLoadingModal from '@/components/wallet-modal/wallet-loading-modal';
import routes from '@/constants/routes';
import { api } from '@/services/api/api';
import { useWalletConnectionStep } from '@/services/wallets/wallet-connection-provider';
import { Network } from '@/types/web3';

import useConnectWallet from '../../services/wallets/use-connect-wallet';

type Props = {
  isOpen: boolean;
  onCancel: () => void;
};

export default function AuthenticationWalletModals({
  isOpen,
  onCancel,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { onSignup, onSuccess } = useWalletConnectionStep();
  const connectionStep = useWalletConnectionStep();

  const { onConnect, onDisconnectWallets } = useConnectWallet({
    async onGetNonce() {
      const { data, error } = await api.GET('/auth/message');

      if (error || !data?.message) {
        throw new Error('Could not get nonce', { cause: error });
      }

      return data.message;
    },
    async onSignedMessage({ signature, wallet_address, message }) {
      const res = await signIn('authenticate-wallet', {
        redirect: false,
        wallet_address,
        signature,
        message,
      });
      const callbackUrl = searchParams.get('callbackUrl');

      if (res?.error || !res?.ok || !res) {
        if (res?.error === 'this account does not exist') {
          // add searchParams to "routes.new" url if callbackUrl is not null
          const redirectSearchParams = new URLSearchParams();
          redirectSearchParams.append('signature', signature);
          redirectSearchParams.append('message', message);
          if (callbackUrl) {
            redirectSearchParams.append('callbackUrl', callbackUrl);
          }
          onSignup();

          return router.push(
            `${routes.new}?${redirectSearchParams.toString()}`
          );
        }

        throw new Error(res?.error ?? 'Could not login');
      }

      onSuccess();
      router.push(callbackUrl ?? routes.dashboard.user.home);
    },
    statesHandler: connectionStep,
  });

  const onConnectWallet = (address: string, network: Network) => {
    onCancel();
    onConnect(address, network);
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
