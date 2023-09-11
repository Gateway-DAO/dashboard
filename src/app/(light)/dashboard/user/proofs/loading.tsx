import { Skeleton, Stack } from '@mui/material';

export default function DataAssetsLoadingPage() {
  return (
    <Stack gap={1}>
      <Stack direction="row" gap={2}>
        <Stack sx={{ flexBasis: '100%' }}>
          <Skeleton variant="text" height={40} width="50%" />
        </Stack>
        <Stack sx={{ flexBasis: '100%' }}>
          <Skeleton variant="text" height={40} width="50%" />
        </Stack>
        <Stack sx={{ flexBasis: '100%' }}>
          <Skeleton variant="text" height={40} width="50%" />
        </Stack>
        <Stack sx={{ flexBasis: '100%' }}>
          <Skeleton variant="text" height={40} width="50%" />
        </Stack>
      </Stack>
      <Stack gap={1}>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </Stack>
    </Stack>
  );
}
