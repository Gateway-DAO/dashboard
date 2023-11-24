import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';

import { Box, Skeleton, Stack, Typography } from '@mui/material';

type User = {
  id: string;
  gatewayId?: string;
  name?: string;
  image?: string;
};

type UserColum = {
  isLoading: boolean;
  user: User | { id: string; type: string } | undefined;
};

export default function UserColumn({ user, isLoading = true }: UserColum) {
  return (
    <Stack direction="row" gap={1.5} alignItems="center">
      {isLoading ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <GTWAvatar name={user?.id} src={user?.image} />
      )}
      <Box>
        <Typography variant="subtitle1" lineHeight={1}>
          {isLoading ? (
            <Skeleton width={200} />
          ) : (
            user?.name ?? user?.gatewayId ?? user?.id
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