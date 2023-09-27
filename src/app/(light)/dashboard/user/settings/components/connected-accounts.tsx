'use client';

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import ModalRight from '@/components/modal/modal-right/modal-right';
import ModalTitle from '@/components/modal/modal-title/modal-title';
import { AliasType, useDisconnectAlias } from '@/hooks/use-disconnect-alias';
import { settings } from '@/locale/en/settings';
import { AuthType } from '@/services/protocol/types';
import { NEGATIVE_CONTAINER_PX } from '@/theme/config/style-tokens';

import { Box, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { DeactivateGatewayId } from './account-sections/deactivate-gateway-id';
import EmailsSection from './account-sections/emails-section';
import SocialsSection from './account-sections/socials-section';
import WalletsSection from './account-sections/wallets-section';

export default function ConnectedAccounts() {
  const { data: session } = useSession();
  const {
    handleDisconnectAlias,
    deactivateGatewayId,
    closeModal,
    modalDeactivateGatewayId,
    isLoading,
  } = useDisconnectAlias();

  console.log(session, session?.user?.email);

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
          onDisconnect={(address) =>
            handleDisconnectAlias({ type: 'email', address })
          }
        />
        <WalletsSection
          wallets={wallets}
          onDisconnect={(address) =>
            handleDisconnectAlias({ type: 'wallet', address })
          }
        />
        <SocialsSection
          onDisconnect={(type) =>
            handleDisconnectAlias({ type: type as AliasType })
          }
        />
      </Stack>
      <ModalRight open={modalDeactivateGatewayId} onClose={closeModal}>
        <ModalTitle onClose={closeModal} />
        <DeactivateGatewayId
          onCancel={closeModal}
          onConfirm={deactivateGatewayId}
          isLoading={isLoading}
        />
      </ModalRight>
    </Box>
  );
}
