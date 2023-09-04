import { Box, Skeleton, Stack } from '@mui/material';

export default function IssuePdaFormSuccessSkeleton() {
  return (
    <Stack>
      <Box sx={{ position: 'absolute', top: { xs: 24, md: 48 } }}>
        <Skeleton
          variant="rounded"
          width={64}
          height={64}
          sx={{ borderRadius: '50%' }}
        />
      </Box>
      <Skeleton variant="text" width={300} height={80} sx={{ mt: 4, mb: 2 }} />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={300}
        sx={{ borderRadius: 1, mb: 3 }}
      />
      <Skeleton variant="rounded" width="100%" height={40} sx={{ mb: 1.5 }} />
      <Skeleton variant="rounded" width="100%" height={40} sx={{ mb: 3 }} />
    </Stack>
  );
}
