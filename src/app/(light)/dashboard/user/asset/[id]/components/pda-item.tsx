/* eslint-disable @next/next/no-img-element */
'use client';

import ClaimValuesList from '@/app/(light)/dashboard/components/claim-values-list/claim-values-list';

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
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import Image from 'next/image';

type Props = {
  pda: any;
  isProofPda?: boolean;
};

export default function PDAItem({ pda, isProofPda = false }: Props) {
  return (
    <>
      <Stack
        direction={'column'}
        sx={{ ...WIDTH_CENTERED, my: 2, mt: -5, mr: 40 }}
      >
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
                    name={pda?.issuer?.username}
                    alt={pda?.issuer?.username}
                    size={30}
                  />
                </Box>
                <Typography
                  variant="body2"
                  id="pda-title"
                  sx={{ fontSize: 16, my: 2, mx: 2, fontWeight: 700 }}
                >
                  {pda?.issuer?.username}
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
            <ClaimValuesList data={pda?.dataAsset?.claimArray} />
          </>
        ) : (
          <>
            <Stack
              direction="column"
              gap={8}
              alignItems="start"
            >
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
