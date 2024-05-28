import { Divider, Skeleton } from '@mui/material';
import { Stack } from '@mui/system';

export default function SectionSkeleton() {
  return (
    <Stack divider={<Divider />}>
      <Skeleton width={200} sx={{ m: 2 }} />
      <Skeleton width={200} sx={{ m: 2 }} />
      <Skeleton width={200} sx={{ m: 2 }} />
    </Stack>
  );
}
