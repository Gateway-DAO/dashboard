import { PublicDataAsset } from '@/services/api/models';

import { Stack, Divider, Typography, List, ListItem } from '@mui/material';

import UserData from '../../../../components/user-data/user-data';
import { IndividualDetailRow } from './components';

type Props = {
  pda: PublicDataAsset;
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
        <List component={Stack} divider={<Divider />}>
          {pda.roles?.map((user, index) => (
            <ListItem key={index}>
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                gap={1}
                sx={{
                  px: {
                    xs: 0,
                    lg: 2,
                  },
                }}
              >
                <UserData
                  did={user.wallet_address!}
                  username={user.wallet_address!}
                  access={user.role!}
                />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
}
