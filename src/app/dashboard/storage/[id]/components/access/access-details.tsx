import { PublicDataAsset } from '@/services/api/models';

import { Stack, Divider, Typography, List, ListItem } from '@mui/material';

import UserData from './user-data';

type Props = {
  pda: PublicDataAsset;
  isProofPda?: boolean;
};

export default function AccessDetails({ pda }: Props) {
  return (
    <Stack
      direction={{
        lg: 'column',
      }}
      gap={1}
    >
      <Stack
        direction="column"
        gap={1}
        sx={{
          px: {
            xs: 0,
            lg: 4,
          },
          py: 2,
        }}
      >
        <Typography variant="subtitle1">Who has access</Typography>
      </Stack>
      <Stack pt={1} divider={<Divider />}>
        <List component={Stack} divider={<Divider />}>
          {pda.roles?.map((user, index) => (
            <ListItem
              component={Stack}
              direction="row"
              alignItems="center"
              key={index}
              sx={{
                px: {
                  xs: 0,
                  lg: 4,
                },
              }}
              gap={2}
            >
              <UserData
                did={user.wallet_address!}
                username={user.wallet_address!}
                role={user.role!}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
}
