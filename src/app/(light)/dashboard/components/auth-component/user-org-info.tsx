import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';

import { Box, Stack, Typography } from '@mui/material';

type Props = {
  id?: string | null;
  image?: string | null;
  name?: string | null;
  gatewayId: string;
};

export default function UserOrgInfo({ id, image, name, gatewayId }: Props) {
  const hasName = name && name.length > 0;
  return (
    <Stack
      component="span"
      direction="row"
      alignItems="center"
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          mr: {
            lg: 1.5,
          },
          zIndex: 1,
        }}
      >
        <GTWAvatar src={image ?? undefined} name={id} alt={gatewayId} />
      </Box>
      <Stack
        direction="column"
        sx={{
          display: {
            xs: 'none',
            lg: 'flex',
          },
        }}
      >
        <Typography component="span" variant="subtitle1" color="primary.main">
          {hasName ? name : `@${gatewayId}`}
        </Typography>
        {hasName && (
          <Typography component="span" variant="caption" color="primary.main">
            @{gatewayId}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
