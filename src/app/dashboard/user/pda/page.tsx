'use client';
import Activities from '@/components/activities/activities';
import { protocol } from '@/locale/en/protocol';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Divider, Stack } from '@mui/material';

export default function ProofPage() {
  // TODO: Remove MOCK
  const pda = {
    id: '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fe375',
    title: 'Chase',
    issuance_date: '2018-04-04T16:00:00.000Z',
    status: 'valid',
    activities: [
      {
        type: 'Issued',
        txHash: 'txhash.com',
        timestamp: '2018-04-04T16:00:00.000Z',
      },
      {
        type: 'Revoked',
        txHash: 'txhash.com',
        timestamp: '2018-04-04T16:00:00.000Z',
      },
    ],
  };

  return (
    <>
      <Stack sx={{ maxWidth: 550, mx: 'auto', my: 2 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            mb: 2,
            width: '100%',
            fontWeight: 700,
            fontSize: 13,
          }}
          onClick={() => console.log('test')} // TODO: Add action
        >
          {protocol.pda.share_a_copy}
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="error"
          sx={{
            mb: 2,
            width: '100%',
            fontWeight: 700,
            fontSize: 13,
          }}
          onClick={() => console.log('test')} // TODO: Add action
          startIcon={<CancelIcon height={20} width={20} color="error" />}
        >
          {protocol.pda.revoke_access}
        </Button>
        <Activities
          activities={pda.activities}
          activitiesTextsType={{
            Issued: 'PDA issued',
            Revoked: 'PDA revoked',
            Suspended: 'PDA suspended',
            Reactivated: 'PDA reactivated',
            Updated: 'PDA updated',
          }}
        />
      </Stack>
      <Divider
        sx={{
          mb: 5,
          mt: 2,
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      />
      <Stack sx={{ maxWidth: 550, mx: 'auto', my: 2 }}>Joao</Stack>
    </>
  );
}
