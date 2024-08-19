import { Stack, Divider, Typography, List, ListItem } from '@mui/material';

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
        <List>
          {pda.access.map((user, index) => (
            <>
              <ListItem key={index}>
                <Stack
                  direction={'row'}
                  justifyContent={"space-between"}
                  gap={1}
                  sx={{
                    px: {
                      xs: 0,
                      lg: 2,
                    },
                  }}
                >
                  <UserData
                    did={user.did}
                    username={user.username}
                    access={user.access}
                  />

                </Stack>
              </ListItem>
              {index < pda.access.length - 1 && <Divider />}
            </>
          ))}
        </List>
      </Stack>
    </Stack>
  );
}
