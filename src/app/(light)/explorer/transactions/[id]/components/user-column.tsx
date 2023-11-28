import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { Organization, User } from '@/services/protocol/types';

import { Box, Skeleton, Stack, Typography } from '@mui/material';

// type User = {
//   id: string;
//   gatewayId: string;
//   name?: string;
//   image?: string;
//   profilePicture?: string;
// };

type UserColum = {
  isLoading: boolean;
  user: any;
};

export default function UserColumn({ user, isLoading = true }: UserColum) {
  return (
    <Stack direction="row" gap={1.5} alignItems="center">
      {isLoading ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <GTWAvatar name={user?.id} src={user?.profilePicture ?? user?.image} />
      )}
      <Box>
        <Typography variant="subtitle1" lineHeight={1}>
          {isLoading ? (
            <Skeleton width={200} />
          ) : (
            user?.name ?? user?.displayName ?? user?.gatewayId ?? user?.id
          )}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {isLoading ? (
            <Skeleton width={100} />
          ) : user?.name ? (
            `@${user?.gatewayId}`
          ) : (
            ''
          )}
        </Typography>
      </Box>
    </Stack>
  );
}
