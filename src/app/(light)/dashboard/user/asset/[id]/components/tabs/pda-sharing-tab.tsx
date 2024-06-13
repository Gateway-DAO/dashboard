import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { PrivateDataAsset } from '@/services/protocol-v3/types';

import { ChevronRightOutlined } from '@mui/icons-material';
import { Divider, IconButton, Stack, Typography } from '@mui/material';

import { IndividualDetailRow } from './components';

export default function PDASharingTab({ pda }: { pda: PrivateDataAsset }) {
  return (
    <IndividualDetailRow>
      <Stack divider={<Divider />}>
        {pda.proofs.map((proof) => {
          return (
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              sx={{ mt: 1, mb: 2 }}
              key={proof.id}
            >
              <Stack direction={'row'}>
                <GTWAvatar
                  name={proof.owner.did}
                  alt={proof.owner.username ?? proof.owner.did}
                  size={45}
                />
                <Typography
                  variant="body1"
                  fontWeight={400}
                  sx={{ mt: 1, mx: 3 }}
                >
                  {proof.owner.username ?? proof.owner.did}
                </Typography>
              </Stack>
              <IconButton>
                <ChevronRightOutlined />
              </IconButton>
            </Stack>
          );
        })}
      </Stack>
    </IndividualDetailRow>
  );
}
