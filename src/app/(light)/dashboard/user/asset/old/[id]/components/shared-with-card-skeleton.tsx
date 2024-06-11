'use client';
import { Skeleton, Stack } from '@mui/material';

export default function SharedWithCardSkeleton() {
  return (
    <Stack
      p={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={120} />
      </Stack>
      <Skeleton variant="text" width={120} />
    </Stack>
  );
}
