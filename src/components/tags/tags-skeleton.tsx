import { Skeleton, Stack } from '@mui/material';

export default function TagsSkeleton() {
  return (
    <Stack direction="row" gap={1} sx={{ mb: 2 }}>
      <Skeleton variant="rounded" width={80} height={25} />
      <Skeleton variant="rounded" width={70} height={25} />
      <Skeleton variant="rounded" width={60} height={25} />
      <Skeleton variant="rounded" width={70} height={25} />
    </Stack>
  );
}
