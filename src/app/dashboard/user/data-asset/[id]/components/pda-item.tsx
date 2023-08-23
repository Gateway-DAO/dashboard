'use client';
import Activities from '@/components/activities/activities';
import ExternalLink from '@/components/external-link/external-link';
import Tags from '@/components/tags/tags';
import { protocol } from '@/locale/en/protocol';
import { PdaQuery } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import { limitCharsCentered } from '@/utils/string';

import { Button, Divider, Stack, Typography } from '@mui/material';

import PdaCardInfo from './pda-card-info';

type Props = {
  pda: PdaQuery['credential'];
};

export default function PDAItem({ pda }: Props) {
  console.log('entrou', pda);

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
          {pda?.title}
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
