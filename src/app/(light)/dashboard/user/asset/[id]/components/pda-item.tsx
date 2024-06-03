/* eslint-disable @next/next/no-img-element */
'use client';

import ClaimValuesList from '@/app/(light)/dashboard/components/claim-values-list/claim-values-list';
import CopyTextButton from '@/components/copy-text-button/copy-text-button';
import Tags from '@/components/tags/tags';
import { pda as pdaLocale } from '@/locale/en/pda';
import { PdaQuery } from '@/services/protocol/types';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
  WIDTH_CENTERED,
} from '@/theme/config/style-tokens';
import { useToggle } from '@react-hookz/web';
import { PartialDeep } from 'type-fest';

import {
  Box,
  Card,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

type Props = {
  pda: any;
  isProofPda?: boolean;
};

export default function PDAItem({ pda, isProofPda = false }: Props) {
  return (
    <>
      <Stack
        direction={'column'}
        sx={{ ...WIDTH_CENTERED, my: 2, mt: -1.1, mr: 40 }}
      >
        <Stack
          direction="column"
          component={Card}
          variant="outlined"
          gap={8}
          sx={{ bgcolor: '#E5DFEA' }}
          alignItems="start"
        >
          <Typography
            variant="body2"
            id="pda-title"
            sx={{ fontSize: 16, my: 2, mx: 4, fontWeight: 700 }}
          >
            {pda?.issuer?.username}
          </Typography>
          <Typography
            variant="body2"
            id="pda-title"
            sx={{ fontSize: { xs: 20, md: 34 }, mx: 4, my: 2, fontWeight: 400 }}
          >
            {pda?.dataAsset?.title}
          </Typography>
        </Stack>
        <Tags tags={pda?.dataAsset?.dataModel?.tags as string[]} />
        <Typography sx={{ mb: 3 }}>{pda?.dataAsset?.description}</Typography>
        {/* <PdaCardInfo pda={pda} isProofPda={isProofPda} /> */}
        {!isProofPda && (
          <>
            {/* <SharedWithCard pda={pda} />
            <ShareCopy pda={pda} />
            <IssuerPDAActions pda={pda} /> */}
            {/* Activies backloged 09/02 */}
            {/* <Activities
              activities={pda.activities}
              activitiesTextsType={{
                Issued: pdaLocale.activities.issued,
                Revoked: pdaLocale.activities.revoked,
                Suspended: pdaLocale.activities.suspended,
                Reactivated: pdaLocale.activities.reactivated,
                Updated: pdaLocale.activities.updated,
              }}
            /> */}
          </>
        )}
        <ClaimValuesList data={pda?.dataAsset?.claimArray} />
      </Stack>
    </>
  );
}
