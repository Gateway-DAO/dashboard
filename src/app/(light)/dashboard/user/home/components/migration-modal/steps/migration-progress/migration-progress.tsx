import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import FromToVerticalIcon from '@/components/icons/from-to-vertical';
import ModalTitle from '@/components/modal/modal-header/modal-header';
import { useGtwSession } from '@/context/gtw-session-provider';
import { common } from '@/locale/en/common';
import { migration, error_status } from '@/locale/en/migration';

import { CheckOutlined, CloseOutlined } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import { MigrationStatus, MigrationTarget } from '../../types';

type Props = {
  target: MigrationTarget;
  status: MigrationStatus;
  error?: string;
  onClose: () => void;
  onReset?: () => void;
};

export default function MigrationProgressStep({
  target,
  error,
  status,
  onClose,
  onReset,
}: Props) {
  const { session } = useGtwSession();

  let IconStatus: JSX.Element;
  let title: string = migration.title.pending;
  let subtitle: string = migration.body.pending;
  let closeButton: string = common.actions.close;
  switch (status) {
    case 'finished':
      IconStatus = (
        <Avatar sx={{ bgcolor: 'success.main' }}>
          <CheckOutlined sx={{ color: 'action.active' }} />
        </Avatar>
      );
      title = migration.title.finished;
      subtitle = migration.body.finished;
      closeButton = common.actions.done;
      break;
    case 'error':
      IconStatus = (
        <Avatar sx={{ bgcolor: 'error.main' }}>
          <CloseOutlined sx={{ color: 'action.active' }} />
        </Avatar>
      );
      title = migration.title.error;
      subtitle = migration.body.error;
      break;
    default:
      IconStatus = <CircularProgress size={38} />;
      break;
  }

  return (
    <>
      <ModalTitle onClose={onClose}>{IconStatus}</ModalTitle>
      <Typography variant="h4" mt={5.5}>
        {title}
      </Typography>
      {status !== 'error' && <Typography mt={2}>{subtitle}</Typography>}
      {status === 'error' && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error_status[error ?? error_status.INTERNAL_SERVER_ERROR]}
        </Alert>
      )}
      <Stack
        mt={4}
        mb={5}
        gap={2}
        p={2}
        border={1}
        borderRadius={1}
        borderColor="divider"
        alignItems="stretch"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Stack direction="row" gap={2}>
            <GTWAvatar
              src={session.user.profilePicture}
              name={session.protocol_id}
              alt={session.user.displayName ?? session.user.gatewayId}
            />
            <Stack>
              <Typography variant="caption">From</Typography>
              <Typography fontWeight="bold">
                @{session.user.gatewayId}
              </Typography>
            </Stack>
          </Stack>
          <Chip label={migration.labels.old_protocol} size="small" />
        </Stack>
        <FromToVerticalIcon />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Stack direction="row" gap={2}>
            <GTWAvatar src={target?.image} name={target.username} />
            <Stack>
              <Typography variant="caption">To</Typography>
              <Typography fontWeight="bold">@{target.username}</Typography>
            </Stack>
          </Stack>
          <Chip
            label={migration.labels.new_protocol}
            size="small"
            color={
              status === 'error' && error === 'USER_ALREADY_HAS_TARGET'
                ? 'error'
                : 'primary'
            }
          />
        </Stack>
      </Stack>
      {status === 'error' && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onReset}
          sx={{ mb: 1.5 }}
        >
          {common.actions.try_again}
        </Button>
      )}
      <Button variant="outlined" color="primary" fullWidth onClick={onClose}>
        {closeButton}
      </Button>
    </>
  );
}
