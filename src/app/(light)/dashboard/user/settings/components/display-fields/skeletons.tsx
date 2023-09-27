import { common } from '@/locale/en/common';

import { FormControl, FormLabel, Skeleton, Stack } from '@mui/material';

export default function DisplayFieldsSkeletons() {
  return (
    <>
      <FormControl>
        <FormLabel htmlFor="avatar" sx={{ fontSize: 14 }}>
          {common.general.avatar}
        </FormLabel>
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="circular" width={80} height={80} />
          <Skeleton width={120} height={46} />
        </Stack>
      </FormControl>

      <Skeleton
        height={56}
        variant="rounded"
        sx={{
          maxWidth: 478,
          width: '100%',
          m: '0 !important',
        }}
      />

      <Skeleton
        variant="rounded"
        sx={{
          maxWidth: 478,
          width: '100%',
          height: 56,
          mt: '0 !important',
        }}
      />
    </>
  );
}
