import { Box, Skeleton, Stack } from '@mui/material';

export default function SuccessSkeleton() {
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
      <Skeleton
        variant="rounded"
        width="100%"
        height={40}
        sx={{ mt: 5, mb: 5 }}
      />
      <Skeleton variant="rectangular" width="100%" sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width="100%" sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width="100%" sx={{ mb: 1 }} />
    </Stack>
  );
}
