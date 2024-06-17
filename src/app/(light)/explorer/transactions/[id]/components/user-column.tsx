import { Box, Skeleton, Stack, Typography } from '@mui/material';

type UserColum = {
  isLoading: boolean;
  did: string;
};

export default function UserColumn({ did, isLoading = true }: UserColum) {
  return (
    <Stack direction="row" gap={1.5} alignItems="center">
      <Box>
        <Typography variant="body1">
          {isLoading ? <Skeleton width={200} /> : did}
        </Typography>
      </Box>
    </Stack>
  );
}
