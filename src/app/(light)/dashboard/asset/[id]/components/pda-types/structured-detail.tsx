import { PrivateDataAsset } from '@/services/server/mock-types';
import { WIDTH_CENTERED } from '@/theme/config/style-tokens';

import { Card, Stack, Typography } from '@mui/material';
import MetaDataDetails from './meta-data-details';

type Props = {
  pda: PrivateDataAsset;
};

export default async function StructuredDetail({ pda }: Props) {
  return (
    <Stack gap={2} sx={WIDTH_CENTERED}>
      <Stack
        direction="column"
        component={Card}
        variant="outlined"
        gap={19.75}
        sx={{ bgcolor: '#EDE3F6', height: '168px' }}
        justifyContent={'end'}
        p={2}
      >
        <Typography
          variant="body2"
          id="pda-title"
          sx={{
            fontSize: { xs: 20, md: 34 },
            fontWeight: 400,
            color: '#53128C',
          }}
        >
          {pda.fileName}
        </Typography>
      </Stack>
      <MetaDataDetails pda={pda} />
    </Stack>
  );
}
