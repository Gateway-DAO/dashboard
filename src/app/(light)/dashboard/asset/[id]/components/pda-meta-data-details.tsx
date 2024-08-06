import { CONTAINER_PX } from '@/theme/config/style-tokens';

import { Stack, Box } from '@mui/material';

import PDATabs from './tabs/pda-tabs';
import { PrivateDataAsset } from '@/services/server/mock-types';

type Props = {
  pda: PrivateDataAsset;
  isProofPda?: boolean;
  isOwner: boolean;
};

export default function PDAMetaDataDetails({ pda, isOwner }: Props) {
  return (
    <Stack
      direction={{
        xs: 'column-reverse',
        lg: 'column',
      }}
      gap={2}
    >
      <Stack
        direction="row"
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
        gap={2}
      >
        <Box sx={{ height: 40 }} />
      </Stack>
      <Box>
        <PDATabs pda={pda} isOwner={isOwner} />
      </Box>
    </Stack>
  );
}
