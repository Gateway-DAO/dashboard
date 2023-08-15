import { GatewayIcon } from '@/components/icons/gateway';

import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

export default function Logo() {
  return (
    <Stack direction="row" component={'a'} alignItems={'center'}>
      <GatewayIcon fontSize="large" />
      <Typography component={'h2'} ml={1}>
        Gateway
      </Typography>
    </Stack>
  );
}
