'use client';

import { useRouter } from 'next/router';

import ExternalLink from '@/components/external-link/external-link';

import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Stack } from '@mui/material';

import PdaCardInfo from './components/pda-card-info';
import PdaCardTitle from './components/pda-card-title';

export default function DashboardUser() {
  return (
    <Stack sx={{ maxWidth: 550, mx: 'auto', my: 2 }}>
      <PdaCardTitle />
      <PdaCardInfo />
      <Button
        variant="outlined"
        sx={{ mb: 2, width: '100%' }}
        onClick={() => console.log('test')}
      >
        Share a copy
      </Button>
      <Button
        variant="outlined"
        color="error"
        sx={{ mb: 2, width: '100%' }}
        onClick={() => console.log('test')}
        startIcon={<CancelIcon height={20} width={20} color="error" />}
      >
        Revoke access
      </Button>
      <ExternalLink
        text="test"
        sxProps={{ alignSelf: 'flex-end' }}
        handleClick={() => console.log('test')} // TODO: Add a dynamic url
      />
    </Stack>
  );
}
