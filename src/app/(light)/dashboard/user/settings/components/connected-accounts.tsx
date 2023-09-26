'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useMemo } from 'react';

import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import ModalRight from '@/components/modal/modal-right/modal-right';
import ModalTitle from '@/components/modal/modal-title/modal-title';
import routes from '@/constants/routes';
import { settings } from '@/locale/en/settings';
import { AuthType } from '@/services/protocol/types';
import { NEGATIVE_CONTAINER_PX } from '@/theme/config/style-tokens';
import { useToggle } from '@react-hookz/web/cjs/useToggle';

import { Box, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import EmailsSection from './account-sections/emails-section';
import SocialsSection from './account-sections/socials-section';
import WalletsSection from './account-sections/wallets-section';

type ModalType = 'email' | 'wallet';

export default function ConnectedAccounts() {
  const { data: session } = useSession();
  const router = useRouter();
  const [openModalRight, setOpenModalRight] = useToggle(false);

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

  const openModal = () => {
    router.push(`#deactivate-gateway-id`, { scroll: false });
    setOpenModalRight();
  };

  const closeModal = () => {
    router.push(routes.dashboardUserSettings, { scroll: false });
    setOpenModalRight();
  };

  const handleDisconnectAlias = (type: ModalType, address: string) => {
    if (session?.user?.authentications?.length === 1) {
      openModal();
    } else {
      if (type === 'email') disconnectEmail(address);
      if (type === 'wallet') disconnectWallet(address);
    }
  };

  const disconnectEmail = (address: string) => {
    console.log('Email removed!', address);
  };

  const disconnectWallet = (address: string) => {
    console.log('Wallet removed!', address);
  };

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
          onDisconnect={(address) => handleDisconnectAlias('email', address)}
        />
        <WalletsSection
          wallets={wallets}
          onDisconnect={(address) => handleDisconnectAlias('wallet', address)}
        />
        <SocialsSection />
      </Stack>
      <ModalRight open={openModalRight} onClose={closeModal}>
        <ModalTitle onClose={closeModal} />
        <Stack>
          <Typography
            component="h3"
            fontSize={34}
            id="deactivate-gateway-id-title"
          >
            Deactivate Gateway ID
          </Typography>
          <Typography sx={{ mb: 6 }}>Test</Typography>
          <LoadingButton
            variant="contained"
            type="submit"
            sx={{
              mt: 3,
            }}
            id="disconnect-alias-action"
          >
            Deactivate
          </LoadingButton>
        </Stack>
      </ModalRight>
    </Box>
  );
}
