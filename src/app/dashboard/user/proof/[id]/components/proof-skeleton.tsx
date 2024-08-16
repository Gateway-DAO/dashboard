import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
  WIDTH_CENTERED,
} from '@/theme/config/style-tokens';

import { Divider, Skeleton, Stack } from '@mui/material';

export default function ProofSkeleton() {
  return (
    <>
      <Stack sx={{ ...WIDTH_CENTERED, my: 2 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={130}
          sx={{ borderRadius: 1, mb: 3 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={150}
          sx={{ borderRadius: 1, mb: 3 }}
        />
      </Stack>
      <Divider
        sx={{
          mb: 5,
          mt: 2,
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      />
      <Stack sx={{ ...WIDTH_CENTERED, my: 2 }}>
        <Skeleton
          variant="text"
          width={200}
          height={30}
          sx={{
            mb: 3,
          }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{
            borderRadius: 1,
            mb: 3,
            width: '100%',
          }}
        />
      </Stack>
    </>
  );
}
