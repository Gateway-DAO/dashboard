import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';

import { Box, Stack, Typography } from '@mui/material';

type Props = {
  image?: string | null;
  name: string;
  gatewayId: string;
};

export default function UserOrgInfo({ image, name, gatewayId }: Props) {
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
        <GTWAvatar src={image ?? undefined} name={gatewayId} />
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
          {name}
        </Typography>
        <Typography component="span" variant="caption" color="primary.main">
          @{gatewayId}
        </Typography>
      </Stack>
    </Stack>
  );
}
