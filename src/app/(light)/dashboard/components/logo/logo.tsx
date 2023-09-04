
import GatewaySquaredIcon from '@/components/icons/gateway-squared';

import { Typography } from '@mui/material';

import LogoContainer from './logo-container';

export default function Logo() {
  return (
    <LogoContainer
    >
      <GatewaySquaredIcon sx={{ fontSize: 40 }} />
      <Typography component="h1" ml={1} color="black" fontWeight="bold">
        Gateway
      </Typography>
    </LogoContainer>
  );
}
