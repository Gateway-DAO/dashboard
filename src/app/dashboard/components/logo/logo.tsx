import { GatewayIcon } from '@/components/icons/gateway';

import { Link, Typography } from '@mui/material';

import LogoContainer from './logo-container';

export default function Logo() {
  return (
    <LogoContainer
    >
      <GatewayIcon sx={{ fontSize: 40 }} />
      <Typography component={'h1'} ml={1} color={'black'}>
        Gateway
      </Typography>
    </LogoContainer>
  );
}
