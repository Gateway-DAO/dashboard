import ClaimValuesList from '@/app/(light)/dashboard/components/claim-values-list/claim-values-list';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { PrivateDataAsset } from '@/services/server/mock-types';
import { WIDTH_CENTERED } from '@/theme/config/style-tokens';
import { claimToArray } from '@/utils/data-model';

import { Card, Stack, Typography } from '@mui/material';
import MetaDataDetails from './meta-data-details';

type Props = {
  pda: PrivateDataAsset;
};

export default async function StructuredDetail({ pda }: Props) {
  const claimArray = [
    {
      property: 'name',
      label: 'Full Name',
      type: 'string',
      value: 'John Doe',
      description: 'The full name of the person',
      metadata: {},
    },
    {
      property: 'age',
      label: 'Age',
      type: 'number',
      value: '30',
      description: 'The age of the person',
      metadata: {},
    },
    {
      property: 'email',
      label: 'Email Address',
      type: 'string',
      value: 'john.doe@example.com',
      description: 'The email address of the person',
      metadata: {},
    },
    {
      property: 'verified',
      label: 'Verified',
      type: 'boolean',
      value: 'true',
      description: "Whether the person's email is verified",
      metadata: {},
    },
  ];

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
          {pda?.dataAsset?.title}
        </Typography>
      </Stack>
      <MetaDataDetails data={claimArray} />
    </Stack>
  );
}
