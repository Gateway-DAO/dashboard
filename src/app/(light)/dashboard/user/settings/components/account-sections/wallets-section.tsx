import WalletConnectModal from '@/app/(light)/login/components/sections/initial/wallet-connect-modal';
import WalletLoadingModal from '@/app/(light)/login/components/sections/initial/wallet-loading-modal';
import { useWalletConnectionStep } from '@/app/(light)/login/providers/wallet-connection-provider';
import { settings } from '@/locale/en/settings';
import { Auth } from '@/services/protocol/types';
import { useToggle } from '@react-hookz/web';
import { useWallet } from '@solana/wallet-adapter-react';
import { PartialDeep } from 'type-fest/source/partial-deep';
import { useDisconnect } from 'wagmi';

import { AddOutlined } from '@mui/icons-material';
import { Button, ListItem, ListItemText } from '@mui/material';

import AliasMenuButton from '../alias-menu-button';
import AccountSection from './account-section';
import SectionSkeleton from './section-skeleton';

type Props = {
  wallets: PartialDeep<Auth>[];
  onDisconnect: (address: string) => void;
  isLoading: boolean;
};

export default function WalletsSection({
  wallets,
  onDisconnect,
  isLoading,
}: Props) {
  const { step, error, onSigning } = useWalletConnectionStep();
  const [modalWallet, setModalWallet] = useToggle(false);
  const { disconnect: solanaDisconnect } = useWallet();
  const { disconnectAsync: evmDisconnect } = useDisconnect();

  const onOpen = async () => {
    try {
      await Promise.all([solanaDisconnect(), evmDisconnect()]);
    } catch {
    } finally {
      setModalWallet(true);
    }
  };

  return (
    <>
      <WalletConnectModal
        title="Choose wallet"
        description="Select a chain and choose one of available wallet providers or create a new wallet."
        isOpen={modalWallet}
        isAddWallet={true}
        onCancel={() => setModalWallet(false)}
      />
      <WalletLoadingModal />

      <AccountSection
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
          wallets?.map(({ data }) => (
            <ListItem
              key={data?.address}
              secondaryAction={
                <AliasMenuButton
                  onDisconnect={() => onDisconnect(data?.address as string)}
                />
              }
            >
              <ListItemText primary={data?.address} secondary={data?.chain} />
            </ListItem>
          ))}
      </AccountSection>
    </>
  );
}
