import { Skeleton, Stack } from '@mui/material';

export default function DataAssetsLoadingPage() {
  return (
    <Stack gap={1} sx={{ pt: 5 }}>
      <Stack direction="row" gap={2} sx={{ mb: 3 }}>
        <Stack sx={{ flexGrow: 1 }}>
          <Skeleton variant="text" height={40} width="20%" />
        </Stack>
        <Stack sx={{ flexBasis: '20%' }}>
          <Skeleton variant="text" height={40} width="50%" />
        </Stack>
        <Stack sx={{ flexBasis: '20%' }}>
          <Skeleton variant="text" height={40} width="50%" />
        </Stack>
      </Stack>
      <Stack gap={2}>
        <Skeleton variant="text" height={60} />
        <Skeleton variant="text" height={60} />
        <Skeleton variant="text" height={60} />
        <Skeleton variant="text" height={60} />
      </Stack>
    </Stack>
  );
}
