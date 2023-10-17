import { common } from '@/locale/en/common';

import { Typography } from '@mui/material';

import GatewaySquaredIcon from '../icons/gateway-squared';

export default function GTWLogo() {
  return (
    <>
      <GatewaySquaredIcon sx={{ fontSize: 40 }} />
      <Typography component="h1" ml={1} color="black" fontWeight="bold">
        {common.general.gateway}
      </Typography>
    </>
  );
}
