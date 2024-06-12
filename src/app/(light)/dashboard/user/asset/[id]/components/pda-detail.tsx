/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';

import ClaimValuesList from '@/app/(light)/dashboard/components/claim-values-list/claim-values-list';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { DataModelQuery, PrivateDataAsset } from '@/services/protocol-v3/types';
import { WIDTH_CENTERED } from '@/theme/config/style-tokens';
import { claimToArray } from '@/utils/data-model';

import { Box, Card, Stack, Typography } from '@mui/material';

type Props = {
  pda: PrivateDataAsset;
  isProofPda?: boolean;
  dataModel: DataModelQuery['dataModel'];
};

export default function PDADetail({ pda, dataModel }: Props) {
  console.log(pda, dataModel);
  const claimArray = claimToArray(pda.dataAsset?.claim, dataModel.schema);
  return (
    <>
      <Stack direction={'column'} sx={WIDTH_CENTERED}>
        {pda.structured ? (
          <>
            <Stack
              direction="column"
              component={Card}
              variant="outlined"
              gap={8}
              sx={{ bgcolor: '#E5DFEA' }}
              alignItems="start"
            >
              <Stack direction={'row'}>
                <Box sx={{ mt: 1.5, ml: 3.5 }}>
                  <GTWAvatar
                    name={pda?.issuer?.did}
                    alt={pda?.issuer?.username ?? pda?.issuer?.did}
                    size={30}
                  />
                </Box>
                <Typography
                  variant="body2"
                  id="pda-title"
                  sx={{ fontSize: 16, my: 2, mx: 2, fontWeight: 700 }}
                >
                  {pda?.issuer?.username ?? pda?.issuer?.did}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                id="pda-title"
                sx={{
                  fontSize: { xs: 20, md: 34 },
                  mx: 4,
                  my: 2,
                  fontWeight: 400,
                }}
              >
                {pda?.dataAsset?.title}
              </Typography>
            </Stack>
            <ClaimValuesList data={claimArray} />
          </>
        ) : (
          <>
            <Stack direction="column" gap={8} alignItems="start">
              <Image
                style={{
                  objectFit: 'contain',
                  aspectRatio: '16/9',
                }}
                width={570}
                height={550}
                className="feature-img"
                src={'/images/static-file.png'}
                alt={'static-file-image'}
              />
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
}
