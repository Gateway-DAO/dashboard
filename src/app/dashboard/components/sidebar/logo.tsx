import { GatewayIcon } from '@/components/icons/gateway';

import { Link, Typography } from '@mui/material';
import { Stack } from '@mui/system';

export default function Logo() {
  return (
    <Link
      sx={{ flexDirection: 'row', display: 'flex', textDecoration: 'none' }}
      href="/"
      component={'a'}
      alignItems={'center'}
    >
      <GatewayIcon sx={{ fontSize: 40 }} />
      <Typography component={'h2'} ml={1} color={'black'}>
        Gateway
      </Typography>
    </Link>
  );
}
