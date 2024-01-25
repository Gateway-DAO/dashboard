import { useSession } from 'next-auth/react';

import ListSection from '@/app/(light)/dashboard/components/list-section/list-section';
import WalletConnectModal from '@/components/wallet-modal/wallet-connect-modal';
import WalletLoadingModal from '@/components/wallet-modal/wallet-loading-modal';
import { useGtwSession } from '@/context/gtw-session-provider';
import { useWalletConnectionStep } from '@/context/wallet-connection-provider';
import useConnectWallet from '@/hooks/use-connect-wallet';
import { settings } from '@/locale/en/settings';
import { Auth, Chain } from '@/services/protocol/types';
import { useToggle } from '@react-hookz/web';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { AddOutlined } from '@mui/icons-material';
import { Button, ListItem, ListItemText } from '@mui/material';

import AliasMenuButton from '../alias-menu-button';
import SectionSkeleton from './section-skeleton';

type Props = {
  wallets: PartialDeep<Auth>[];
  onDisconnect: (address: string, chain: Chain) => void;
  isLoading: boolean;
};

export default function WalletsSection({
  wallets,
  onDisconnect,
  isLoading,
}: Props) {
  const connectionStep = useWalletConnectionStep();
  const { update } = useSession();
  const { privateApi } = useGtwSession();
  const [modalWallet, setModalWallet] = useToggle(false);

  const { onConnect, onDisconnectWallets } = useConnectWallet({
    async onGetNonce(wallet, chain) {
      const res = await privateApi.protocol_add_wallet({ wallet, chain });
      return res.addWallet.message;
    },
    async onSignedMessage({ chain, signature, wallet, publicKey }) {
      const res = await privateApi.protocol_add_wallet_confirmation({
        signature,
        wallet,
        chain,
        publicKey: publicKey || null,
      });

      if (!res || (res && !res.addWalletConfirmation.id)) {
        throw new Error('Could not add wallet');
      }
      await update();
    },
    statesHandler: connectionStep,
  });

  const onSetPending = async () => {
    try {
      await onDisconnectWallets();
    } catch {
    } finally {
      connectionStep.onPending();
    }
  };

  const onOpen = async () => {
    await onDisconnectWallets();
    setModalWallet(true);
  };

  const onConnectWallet = (
    address: string,
    chain: Chain,
    publicKey?: string
  ) => {
    setModalWallet(false);
    onConnect(address, chain, publicKey);
  };

  const onCancel = async () => {
    onSetPending();
    setModalWallet(false);
  };

  return (
    <>
      <WalletConnectModal
        title="Choose wallet"
        description="Select a chain and choose one of available wallet providers or create a new wallet."
        isOpen={modalWallet}
        onConnect={onConnectWallet}
        onCancel={onCancel}
      />
      <WalletLoadingModal canClose onDisconnect={onSetPending} />

      <ListSection
        title={settings.connected_accounts.wallet}
        button={
          <Button variant="text" startIcon={<AddOutlined />} onClick={onOpen}>
            {settings.actions.add_wallet}
          </Button>
        }
      >
        {isLoading && <SectionSkeleton />}
        {wallets.length === 0 && !isLoading && (
          <ListItemText sx={{ mx: 2 }}>No items to be displayed</ListItemText>
        )}
        {wallets.length > 0 &&
          !isLoading &&
          wallets?.map(({ data }) => (
            <ListItem
              key={data?.address}
              secondaryAction={
                <AliasMenuButton
                  onDisconnect={() =>
                    onDisconnect(data?.address as string, data?.chain as Chain)
                  }
                />
              }
            >
              <ListItemText primary={data?.address} secondary={data?.chain} />
            </ListItem>
          ))}
      </ListSection>
    </>
  );
}
