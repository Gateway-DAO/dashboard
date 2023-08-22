'use client';
import Activities from '@/components/activities/activities';
import ExternalLink from '@/components/external-link/external-link';
import Tags from '@/components/tags/tags';
import { protocol } from '@/locale/en/protocol';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import { limitCharsCentered } from '@/utils/string';

import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Divider, Skeleton, Stack, Typography } from '@mui/material';

import PdaCardInfo from './components/pda-card-info';

export default function ProofPage() {
  // TODO: Remove MOCK
  const isLoading = false;
  const pda = {
    id: '7Cae5130c16e6c8b686440b900d93fe1291977e70b812d170024f1cffd0e3fe375',
    title: 'Chase',
    description: 'Lorem ipsum dolor sit amet propectos dolores propensos',
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
    dataModel: {
      tags: ['lorem', 'ipsum', 'dolor', 'sit', 'amet'],
    },
  };

  return (
    <>
      <Stack sx={{ maxWidth: 550, mx: 'auto', my: 2 }}>
        <ExternalLink
          text={`ID ${limitCharsCentered(pda?.id, 8)}`}
          sxProps={{ alignSelf: 'flex-start' }}
          onClick={() => console.log('test')}
        />
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: 24, md: 48 }, my: 2, fontWeight: 400 }}
        >
          {isLoading ? <Skeleton width={300} /> : pda?.title}
        </Typography>
        <Tags tags={pda?.dataModel?.tags} />
        <Typography sx={{ mb: 3 }}>{pda?.description}</Typography>
        <PdaCardInfo pda={pda} />
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
