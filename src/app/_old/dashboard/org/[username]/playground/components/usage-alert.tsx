'use client';

import useOrganization from '@/hooks/use-organization';

import { InfoOutlined } from '@mui/icons-material';
import { AlertTitle, Stack, Typography } from '@mui/material';

export default function UsageAlert() {
  const { organization } = useOrganization();
  return (
    <Stack
      sx={{
        backgroundColor: '#D6EDF6',
        color: '#014361',
        borderRadius: '16px',
        mb: 4,
        px: '16px',
        py: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <InfoOutlined />
      <Stack>
        <AlertTitle>
          Make sure to use the mutation values related to your organization
        </AlertTitle>
        <Typography variant="body2">
          organization:{' '}
          {`{ type: GATEWAY_ID, value: "${organization?.gatewayId}"}`}
        </Typography>
      </Stack>
    </Stack>
  );
}
