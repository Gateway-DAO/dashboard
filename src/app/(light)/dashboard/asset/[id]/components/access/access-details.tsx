import { Stack, Divider, Typography } from '@mui/material';

import { PrivateDataAsset } from '@/services/server/mock-types';
import UserData from '../../../../components/user-data/user-data';
import { IndividualDetailRow, RowText } from './components';

type Props = {
  pda: PrivateDataAsset;
  isProofPda?: boolean;
};

export default function AccessDetails({ pda }: Props) {
  return (
    <Stack
      direction={{
        xs: 'column-reverse',
        lg: 'column',
      }}
      gap={1}
    >
      <IndividualDetailRow>
        <Typography variant="subtitle1">Who has access</Typography>
      </IndividualDetailRow>
      <Stack pt={1} divider={<Divider />}>
        {pda.access.map((user, index) => (
          <IndividualDetailRow key={index}>
            <UserData
              did={user.did}
              username={user.username}
              access={user.access}
            />
          </IndividualDetailRow>
        ))}
      </Stack>
    </Stack>
  );
}
