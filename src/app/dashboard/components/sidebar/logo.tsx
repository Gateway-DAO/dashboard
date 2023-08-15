import { ReactNode } from 'react';

import { GatewayIcon } from '@/components/icons/gateway';

import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

type Props = {
  content: ReactNode;
};

export default function Logo() {
  return (
    <>
      <Stack direction="column" component={'a'}>
        <GatewayIcon />
        <Typography component={'h2'}>Gateway</Typography>
      </Stack>
    </>
  );
}
