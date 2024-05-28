import { ConfirmDelete } from '@/components/confirm-delete/confirm-delete';
import Loading from '@/components/loadings/loading/loading';
import { useGtwSession } from '@/context/gtw-session-provider';
import { common } from '@/locale/en/common';
import { settings } from '@/locale/en/settings';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Alert, Divider, Stack, Typography } from '@mui/material';

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

export function DeactivateGatewayId({ onCancel, onConfirm, isLoading }: Props) {
  const { session } = useGtwSession();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Stack>
          <Alert
            variant="standard"
            color="error"
            icon={<ErrorOutlineIcon />}
            sx={{ mb: 4, mt: 2 }}
          >
            {common.general.alert_important}
          </Alert>
          <Typography variant="h4">
            {settings.connected_accounts.modal_confirm_delete.title}
          </Typography>
          <Typography sx={{ mb: 6, mt: 1 }}>
            {settings.connected_accounts.modal_confirm_delete.subtitle}
          </Typography>
          <Typography fontWeight={600} sx={{ mb: 4 }}>
            {settings.connected_accounts.modal_confirm_delete.subtitle2}
          </Typography>
          <Stack divider={<Divider />} gap={2} sx={{ mb: 2 }}>
            <Typography>
              {settings.connected_accounts.modal_confirm_delete.text1}
            </Typography>
            <Typography>
              {settings.connected_accounts.modal_confirm_delete.text2}
            </Typography>
            <Typography>
              <strong>@{session.user.gatewayId}</strong>{' '}
              {settings.connected_accounts.modal_confirm_delete.text3}
            </Typography>
          </Stack>
          <ConfirmDelete
            textKey={settings.connected_accounts.modal_confirm_delete.text_key}
            buttonText={
              settings.connected_accounts.modal_confirm_delete.text_key
            }
            checkText={
              settings.connected_accounts.modal_confirm_delete.checkbox
            }
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        </Stack>
      )}
    </>
  );
}
