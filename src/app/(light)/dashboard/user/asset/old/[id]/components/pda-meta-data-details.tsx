'use client';

import { DataModelQuery, PrivateDataAsset } from '@/services/protocol-v3/types';

import { Stack, Box } from '@mui/material';

import ShareCopy from './share-copy/share-copy';
import PDATabs from './tabs/pda-tabs';

type Props = {
  pda: PrivateDataAsset;
  dataModel: DataModelQuery['dataModel'];
  isProofPda?: boolean;
};

export default function PDAMetaDataDetails({ pda, dataModel }: Props) {
  return (
    <Stack direction={'column'}>
      <Box sx={{ width: '10%', mx: '30%' }}>
        <ShareCopy pda={pda} />
      </Box>

      <PDATabs pda={pda} dataModel={dataModel} />
    </Stack>
  );
}
