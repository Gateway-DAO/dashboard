import GatewaySquaredIcon from '@/components/icons/gateway-squared';
import { common } from '@/locale/en/common';

import { Chip, Stack, Tooltip, Typography } from '@mui/material';

import LogoContainer from './logo-container';

export default function Logo() {
  const { NEXT_PUBLIC_API_ENV } = process.env;

  return (
    <Stack direction="row" alignItems="center">
      <LogoContainer>
        <GatewaySquaredIcon sx={{ fontSize: 40 }} />
        <Typography component="h1" ml={1} color="black" fontWeight="bold">
          {common.general.gateway}
        </Typography>
      </LogoContainer>
      {NEXT_PUBLIC_API_ENV === 'testnet' && (
        <Tooltip
          title="You are on the Gateway Sandbox. The data is temporary and will expire in 60 days."
          placement="right"
          arrow
        >
          <Chip color="warning" size="small" variant="filled" label="Sandbox" />
        </Tooltip>
      )}
    </Stack>
  );
}
