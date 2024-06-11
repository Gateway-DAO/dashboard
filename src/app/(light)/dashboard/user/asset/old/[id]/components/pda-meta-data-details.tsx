'use client';

import { Stack, Box } from '@mui/material';

import ShareCopy from './share-copy/share-copy';
import PDATabs from './tabs/pda-tabs';

type Props = {
  pda: any;
  isProofPda?: boolean;
};

export default function PDAMetaDataDetails({ pda, isProofPda = false }: Props) {
  return (
    <Stack direction={'column'}>
      <Box sx={{ width: '10%', mx: '30%' }}>
        <ShareCopy pda={pda} />
      </Box>

      <PDATabs pda={pda} />
    </Stack>
  );
}
