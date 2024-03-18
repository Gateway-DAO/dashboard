import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import FromToVerticalIcon from '@/components/icons/from-to-vertical';
import ModalTitle from '@/components/modal/modal-header/modal-header';
import { useGtwSession } from '@/context/gtw-session-provider';
import { common } from '@/locale/en/common';

import { CheckOutlined, MoreHorizOutlined } from '@mui/icons-material';
import { Avatar, Button, Chip, Stack, Typography } from '@mui/material';

import { MigrationTarget } from '../../state';

type Props = {
  target: MigrationTarget;
  isSuccess: boolean;
  onClose: () => void;
};

const copy = {
  title: {
    success: 'Data migrated successfully',
    migrating: 'Data migration is in progress',
  },
  body: {
    success:
      "The data migration was completed successfully and your it's available in you Gateway Wallet app.",
    migrating:
      'The migration will be completed soon. When the migration completes, your data will appear in your Gateway Wallet app.',
  },
  labels: {
    old_protocol: 'Old protocol',
    new_protocol: 'New protocol',
  },
};

export default function MigrationProgressStep({
  target,
  isSuccess,
  onClose,
}: Props) {
  const { session } = useGtwSession();
  return (
    <>
      <ModalTitle onClose={onClose}>
        {isSuccess ? (
          <Avatar sx={{ bgcolor: 'success.main' }}>
            <CheckOutlined sx={{ color: 'action.active' }} />
          </Avatar>
        ) : (
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <MoreHorizOutlined sx={{ color: 'action.active' }} />
          </Avatar>
        )}
      </ModalTitle>
      <Typography variant="h4" mt={5.5}>
        {isSuccess ? copy.title.success : copy.title.migrating}
      </Typography>
      <Typography mt={2}>
        {isSuccess ? copy.body.success : copy.body.migrating}
      </Typography>
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
          <Chip label={copy.labels.old_protocol} size="small" />
        </Stack>
        <FromToVerticalIcon />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Stack direction="row" gap={2}>
            <GTWAvatar src={target.image} name={target.username} />
            <Stack>
              <Typography variant="caption">To</Typography>
              <Typography fontWeight="bold">@{target.username}</Typography>
            </Stack>
          </Stack>
          <Chip label={copy.labels.new_protocol} size="small" color="primary" />
        </Stack>
      </Stack>
      <Button variant="outlined" color="primary" fullWidth onClick={onClose}>
        {common.actions.done}
      </Button>
    </>
  );
}
