import Link from 'next/link';

import routes from '@/constants/routes';
import { common } from '@/locale/en/common';

import { Stack } from '@mui/material';

import { LoadingButton } from '../loading-button/loading-button';

export function ConnectNow() {
  return (
    <Stack
      sx={{
        alignItems: 'flex-start',
      }}
    >
      <Link passHref href={routes.login}>
        <LoadingButton variant="outlined">
          {common.actions.connect_now}
        </LoadingButton>
      </Link>
    </Stack>
  );
}
