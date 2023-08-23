import Activities from '@/components/activities/activities';
import ShareButton from '@/components/buttons/share-button';
import ExternalLink from '@/components/external-link/external-link';
import Tags from '@/components/tags/tags';
import { protocol } from '@/locale/en/protocol';
import { apiPublic } from '@/services/protocol/api';
import { PdaQuery } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';
import { limitCharsCentered } from '@/utils/string';

import { Divider, Stack, Typography } from '@mui/material';

import DataTable from './data-table';
import PdaCardInfo from './pda-card-info';

type Props = {
  id: string;
};

export default async function PDAItem({ id }: Props) {
  const getPDA = async (): Promise<PdaQuery['credential']> => {
    const pda = await apiPublic.pda({ id });
    return pda.credential;
  };
  const pda = await getPDA();
  return (
    <>
      <Stack sx={{ maxWidth: 550, mx: 'auto', my: 2 }}>
        <ExternalLink
          text={`ID ${limitCharsCentered(pda?.id, 8)}`}
          href="https://www.google.com"
        />
        <Typography
          variant="h3"
          sx={{ fontSize: { xs: 24, md: 48 }, my: 2, fontWeight: 400 }}
        >
          {pda?.title}
        </Typography>
        <Tags tags={pda?.dataModel?.tags as string[]} />
        <Typography sx={{ mb: 3 }}>{pda?.description}</Typography>
        <PdaCardInfo pda={pda} />
        <ShareButton />
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
      <DataTable title={protocol.pda.claim} data={pda?.claimArray} />
    </>
  );
}
