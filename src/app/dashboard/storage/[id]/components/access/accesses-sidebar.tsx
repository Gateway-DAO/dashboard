import { PublicACL } from '@/services/api/models';

import { Stack, Divider, Typography, List } from '@mui/material';

import Access from './access';
import AccessSkeleton from './access-skeleton';

type Props = {
  acl?: PublicACL[];
};

export default function AccessesSidebar({ acl }: Props) {
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
          {acl?.map((access) => <Access key={access.did} {...access} />) ??
            [1, 2, 3].map((key) => <AccessSkeleton key={key} />)}
        </List>
      </Stack>
    </Stack>
  );
}
