import { PublicDataAsset } from '@/services/api/models';

import { Stack, Divider, Typography, List, ListItem } from '@mui/material';

import Access from './access';

type Props = {
  pda: PublicDataAsset;
  isProofPda?: boolean;
};

export default function AccessesSidebar({ pda }: Props) {
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
          {pda.acl?.map((access) => (
            <ListItem
              component={Stack}
              direction="row"
              alignItems="center"
              key={access.solana_address}
              sx={{
                px: {
                  xs: 0,
                  lg: 4,
                },
              }}
              gap={2}
            >
              <Access {...access} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
}
