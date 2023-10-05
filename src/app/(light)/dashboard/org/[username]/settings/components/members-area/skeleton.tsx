import { Skeleton, Stack } from '@mui/material';

export const LoadingMemberItem = () => (
  <Stack direction="row" sx={{ mx: 2, my: 2 }} alignItems="center">
    <Skeleton variant="circular" sx={{ height: 40, width: 40, mr: 2 }} />
    <Stack>
      <Skeleton sx={{ width: 100 }} />
      <Skeleton sx={{ width: 100, height: 20 }} />
    </Stack>
  </Stack>
);
