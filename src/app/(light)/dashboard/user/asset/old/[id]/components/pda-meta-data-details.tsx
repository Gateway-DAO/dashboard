'use client';

import { DataModelQuery, PrivateDataAsset } from '@/services/protocol-v3/types';
import { CONTAINER_PX } from '@/theme/config/style-tokens';

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
    <Stack
      direction={{
        xs: 'column-reverse',
        lg: 'column',
      }}
      gap={2}
    >
      <Box
        alignSelf={{
          lg: 'flex-end',
        }}
        width={{
          xs: '100%',
          lg: 'auto',
        }}
        pr={{
          ...CONTAINER_PX,
          xs: 0,
          md: 0,
        }}
      >
        <ShareCopy pda={pda} />
      </Box>
      <Box>
        <PDATabs pda={pda} dataModel={dataModel} />
      </Box>
    </Stack>
  );
}
