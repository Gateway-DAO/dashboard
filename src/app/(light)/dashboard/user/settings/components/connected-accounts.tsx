'use client';

import { useSession } from 'next-auth/react';

import Loading from '@/components/loadings/loading/loading';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { mutations } from '@/constants/queries';
import { useGtwSession } from '@/context/gtw-session-provider';
import { useDisconnectAlias } from '@/hooks/use-disconnect-alias';
import { errorMessages } from '@/locale/en/errors';
import { settings } from '@/locale/en/settings';
import { Exact } from '@/services/protocol/types';
import { useToggle } from '@react-hookz/web/cjs/useToggle';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';

import AddEmail from './account-sections/add-email/add-email';
import { DeactivateGatewayId } from './account-sections/deactivate-gateway-id';

export default function ConnectedAccounts() {
  const { privateApi } = useGtwSession();
  const { update } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const [modalAddEmail, setModalAddEmail] = useToggle(false);
  const {
    deactivateGatewayId,
    closeModal,
    modalDeactivateGatewayId,
    isLoading,
  } = useDisconnectAlias();

  const updateNotificationEmail = useMutation({
    mutationKey: [mutations.update_notification_email],
    mutationFn: ({
      email,
    }: Exact<{
      email: string;
    }>) => {
      return privateApi.updateNotificationEmail({
        email,
      });
    },
    onError: () => {
      enqueueSnackbar(errorMessages.SOMETHING_WENT_WRONG, {
        variant: 'error',
      });
    },
    onSuccess: update,
  });

  return (
    <>
      {isLoading ||
        (updateNotificationEmail.isLoading && <Loading fullScreen />)}
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
        <ModalRight
          open={modalDeactivateGatewayId || modalAddEmail}
          onClose={() => {
            closeModal();
            setModalAddEmail(false);
          }}
        >
          <ModalHeader
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
      </Box>
    </>
  );
}
