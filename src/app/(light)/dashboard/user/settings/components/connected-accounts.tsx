'use client';

import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import WalletConnectModal from '@/app/(light)/login/components/sections/initial/wallet-connect-modal';
import WalletLoadingModal from '@/app/(light)/login/components/sections/initial/wallet-loading-modal';
import WalletConnectionProvider from '@/app/(light)/login/providers/wallet-connection-provider';
import Loading from '@/components/loadings/loading/loading';
import ModalRight from '@/components/modal/modal-right/modal-right';
import ModalTitle from '@/components/modal/modal-title/modal-title';
import { useDisconnectAlias } from '@/hooks/use-disconnect-alias';
import { settings } from '@/locale/en/settings';
import { AuthType } from '@/services/protocol/types';
import { NEGATIVE_CONTAINER_PX } from '@/theme/config/style-tokens';
import { useToggle } from '@react-hookz/web/cjs/useToggle';

import { Box, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import AddEmail from './account-sections/add-email/add-email';
import { DeactivateGatewayId } from './account-sections/deactivate-gateway-id';
import EmailsSection from './account-sections/emails-section';
import SocialsSection from './account-sections/socials-section';
import WalletsSection from './account-sections/wallets-section';

const EvmProvider = dynamic(
  () => import('../../../../login/providers/evm-provider'),
  {
    ssr: false,
  }
);
const SolanaProvider = dynamic(
  () => import('../../../../login/providers/solana-provider'),
  {
    ssr: false,
  }
);

export default function ConnectedAccounts() {
  const { data: session, update, status } = useSession();
  const [modalWallet, setModalWallet] = useToggle(false);

  const [modalAddEmail, setModalAddEmail] = useToggle(false);
  const {
    handleDisconnectAlias,
    deactivateGatewayId,
    closeModal,
    modalDeactivateGatewayId,
    isLoading,
  } = useDisconnectAlias();

  const wallets = useMemo(() => {
    return (
      session?.user.authentications?.filter(
        (a) => a.type === AuthType.Wallet
      ) ?? []
    );
  }, [session]);

  const emails = useMemo(() => {
    return (
      session?.user.authentications?.filter((a) => a.type === AuthType.Email) ??
      []
    );
  }, [session]);

  return (
    <>
      {isLoading ? (
        <Loading fullScreen />
      ) : (
        <Box
          sx={{
            '.MuiListItem-root': {
              minHeight: 72,
            },
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            {settings.connected_accounts.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {settings.connected_accounts.description}
          </Typography>
          <Stack divider={<Divider sx={{ mx: NEGATIVE_CONTAINER_PX }} />}>
            <EmailsSection
              emails={emails}
              userEmail={session?.user?.email as string}
              onAddEmail={setModalAddEmail}
              onDisconnect={(address) =>
                handleDisconnectAlias({ type: AuthType.Email, address })
              }
              isLoading={status === 'loading'}
            />
            <WalletsSection
              wallets={wallets}
              onAddWallet={setModalWallet}
              onDisconnect={(address) =>
                handleDisconnectAlias({ type: AuthType.Wallet, address })
              }
              isLoading={status === 'loading'}
            />
            <SocialsSection
              onDisconnect={(type) =>
                handleDisconnectAlias({ type: type as AuthType })
              }
            />
          </Stack>
          <ModalRight
            open={modalDeactivateGatewayId || modalAddEmail}
            onClose={() => {
              closeModal();
              setModalAddEmail(false);
            }}
          >
            <ModalTitle
              onClose={() => {
                closeModal();
                setModalAddEmail(false);
              }}
            />
            {modalDeactivateGatewayId && (
              <DeactivateGatewayId
                onCancel={closeModal}
                onConfirm={deactivateGatewayId}
                isLoading={isLoading}
              />
            )}
            {modalAddEmail && (
              <AddEmail
                onSuccess={() => {
                  update();
                  setModalAddEmail(false);
                }}
              />
            )}
          </ModalRight>
          <EvmProvider>
            <SolanaProvider>
              <WalletConnectionProvider>
                <WalletConnectModal
                  title="Choose wallet"
                  description="Select a chain and choose one of available wallet providers or create a new wallet."
                  isOpen={modalWallet}
                  onCancel={() => setModalWallet(false)}
                />
                <WalletLoadingModal />
              </WalletConnectionProvider>
            </SolanaProvider>
          </EvmProvider>
        </Box>
      )}
    </>
  );
}
