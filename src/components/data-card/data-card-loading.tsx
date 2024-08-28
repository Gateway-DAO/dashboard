import { Stack, Card, CardProps, Box, Skeleton } from '@mui/material';

export default function DataCardLoading(props: CardProps) {
  return (
    <Card variant="outlined" {...props}>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          gap: 3,
          p: 2,
          height: '100%',
        }}
      >
        <Stack direction="column" gap={3}>
          <Stack direction="row" gap={1} alignItems="center">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width="50%" />
          </Stack>
          <Stack direction="column" gap={0.5}>
            <Skeleton variant="text" width="45%" />
            <Skeleton
              variant="text"
              height={24}
              sx={{ transform: 'none', borderRadius: 0.5 }}
            />
          </Stack>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: '1fr 0.8fr',
          }}
        >
          <Skeleton variant="text" />
        </Box>
      </Stack>
    </Card>
  );
}
