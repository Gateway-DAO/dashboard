import GatewaySquaredThemedIcon from '@/components/icons/gateway-squared-themed';

import { Paper, Stack } from '@mui/material';

export default function FooterContent() {
  return (
    <Stack
      component={Paper}
      elevation={0}
      sx={{
        backgroundColor: 'primary.100',
        p: 4,
        gap: 3,
      }}
    >
      <GatewaySquaredThemedIcon
        theme="light"
        sx={{
          height: 72,
          width: 72,
        }}
      />
      <Stack></Stack>
    </Stack>
  );
}
