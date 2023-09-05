import GatewaySquaredIcon from '@/components/icons/gateway-squared';
import { common } from '@/locale/en/common';

import { Typography } from '@mui/material';

import LogoContainer from './logo-container';

export default function Logo() {
  return (
    <LogoContainer>
      <GatewaySquaredIcon sx={{ fontSize: 40 }} />
      <Typography component="h1" ml={1} color="black" fontWeight="bold">
        {common.general.gateway}
      </Typography>
    </LogoContainer>
  );
}
